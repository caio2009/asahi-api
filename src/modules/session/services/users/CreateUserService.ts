import AppError from '@shared/errors/AppError';
import User from '@modules/session/infra/typeorm/entities/User';
import IUsersRepository from '@modules/session/repositories/IUsersRepository';
import validateUser from '@modules/session/validations/validateUser';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';

export interface ICreateUserData {
  name: string;
  username: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute(data: ICreateUserData): Promise<User> {
    await validateUser(data, 'create');

    const finded = await this.usersRepository.findByUsername(data.name);
    if (finded) {
      throw new AppError(409, 'User with this username already exists!');
    }

    const obj = new User();
    obj.name = data.name;
    obj.username = data.username;
    obj.password = await bcrypt.hash(data.password, 10);

    return await this.usersRepository.save(obj);
  }
}

export default CreateUserService;