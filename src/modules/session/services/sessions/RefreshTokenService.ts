import IRefreshTokensRepository from "@modules/session/repositories/IRefreshTokensRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import jwt from 'jsonwebtoken';
import User from "@modules/session/infra/typeorm/entities/User";
import IUsersRepository from "@modules/session/repositories/IUsersRepository";
import RefreshToken from "@modules/session/infra/typeorm/entities/RefreshToken";

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository
  ) { }

  async execute(refreshToken: string): Promise<RefreshTokenResponse> {
    if (!refreshToken) throw new AppError(401, 'Missing refresh token.');

    const findedRefreshToken = await this.refreshTokensRepository.findByValue(refreshToken);
    if (!findedRefreshToken) throw new AppError(401, 'Invalid refresh token.');

    // try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as User;

    const user = await this.usersRepository.findByUsername(decoded.username);

    await this.refreshTokensRepository.delete(findedRefreshToken.id);

    let newRefreshToken = new RefreshToken();
    newRefreshToken.value = this.generateRefreshToken(user);
    newRefreshToken = await this.refreshTokensRepository.save(newRefreshToken);

    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: newRefreshToken.value
    };
    // } catch (err) {
    //   throw new AppError(401, 'Invalid refresh token');
    // }
  }

  private generateAccessToken(user: User) {
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) throw new Error('Missing access token secret.');

    const payload = {
      name: user.name,
      username: user.username
    };

    return jwt.sign(payload, secret, {
      subject: user.username,
      expiresIn: 30
    });
  }

  private generateRefreshToken(user: User) {
    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (!secret) throw new Error('Missing refresh token secret.');

    const payload = {
      username: user.username
    };

    return jwt.sign(payload, secret);
  }
}

export default RefreshTokenService;