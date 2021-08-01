import IRefreshTokensRepository from "@modules/session/repositories/IRefreshTokensRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class SignOutService {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository
  ) { }

  async execute(refreshToken: string): Promise<void> {
    const finded = await this.refreshTokensRepository.findByValue(refreshToken);

    if (!finded) {
      throw new AppError(404, 'Refresh token not found.');
    }

    await this.refreshTokensRepository.delete(finded.id);
  }
}

export default SignOutService;