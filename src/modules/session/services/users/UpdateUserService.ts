import AppError from '@shared/errors/AppError';
import User from '@modules/session/infra/typeorm/entities/User';
import IUsersRepository from '@modules/session/repositories/IUsersRepository';
import validateUser from '@modules/session/validations/validateUser';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';

export interface IUpdateUserData {
  id: string;
  name: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute(data: IUpdateUserData): Promise<User> {
    await validateUser(data, 'update');

    const obj = await this.usersRepository.findByIdOrFail(data.id);
    obj.name = data.name;

    // Update password only if password changed
    if (!await bcrypt.compare(data.password, obj.password)) {
      obj.password = await bcrypt.hash(data.password, 10);
    }

    return await this.usersRepository.save(obj);
  }
}

export default CreateUserService;