import User from "../infra/typeorm/entities/User";

interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByIdOrFail(id: string): Promise<User>;
  findByUsername(username: string): Promise<User | undefined>;
  save(data: User): Promise<User>;
  delete(id: string): Promise<void>;
}

export default IUsersRepository;