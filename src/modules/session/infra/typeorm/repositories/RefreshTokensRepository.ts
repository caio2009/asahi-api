import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import IRefreshTokensRepository from "@modules/session/repositories/IRefreshTokensRepository";
import RefreshToken from '../entities/RefreshToken';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = getRepository(RefreshToken);
  }

  async findAll(): Promise<RefreshToken[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<RefreshToken> {
    return await this.repository.findOne(id);
  }

  async findByIdOrFail(id: string): Promise<RefreshToken> {
    const result = await this.repository.findOne(id);
    if (!result) throw new AppError(404, 'Refresh token not found!');
    return result;
  }

  async findByValue(value: string): Promise<RefreshToken | undefined> {
    return await this.repository.findOne({ value });
  }

  async save(data: RefreshToken): Promise<RefreshToken> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default RefreshTokensRepository;