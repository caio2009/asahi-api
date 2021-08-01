import AppError from '@shared/errors/AppError';
import IRefreshTokensRepository from '@modules/session/repositories/IRefreshTokensRepository';
import IUsersRepository from '@modules/session/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import User from '@modules/session/infra/typeorm/entities/User';
import jwt from 'jsonwebtoken';
import RefreshToken from '@modules/session/infra/typeorm/entities/RefreshToken';

interface ISignInData {
  username: string;
  password: string;
}

interface SignInResponse {
  user: {
    name: string;
    username: string;
  };
  accessToken: string;
  refreshToken: string;
}

@injectable()
class SignInService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository
  ) { }

  async execute({ username, password }: ISignInData): Promise<SignInResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError(401, 'Incorrect username/password combination.');
    }

    if (await bcrypt.compare(password, user.password)) {
      let refreshToken = new RefreshToken();
      refreshToken.value = this.generateRefreshToken(user);
      refreshToken = await this.refreshTokensRepository.save(refreshToken);

      return {
        user: {
          name: user.name,
          username: user.username
        },
        accessToken: this.generateAccessToken(user),
        refreshToken: refreshToken.value
      }
    }
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

export default SignInService;