import RefreshToken from "../infra/typeorm/entities/RefreshToken";

interface IRefreshTokensRepository {
  findAll(): Promise<RefreshToken[]>;
  findById(id: string): Promise<RefreshToken | undefined>;
  findByIdOrFail(id: string): Promise<RefreshToken>;
  findByValue(value: string): Promise<RefreshToken | undefined>;
  save(data: RefreshToken): Promise<RefreshToken>;
  delete(id: string): Promise<void>;
}

export default IRefreshTokensRepository;