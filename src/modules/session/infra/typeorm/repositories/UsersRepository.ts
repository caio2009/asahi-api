import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import IUsersRepository from "@modules/session/repositories/IUsersRepository";
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findByIdOrFail(id: string): Promise<User> {
    const result = await this.repository.findOne(id);
    if (!result) throw new AppError(404, 'User not found!');
    return result;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.repository.findOne({ username });
  }

  async save(data: User): Promise<User> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersRepository;