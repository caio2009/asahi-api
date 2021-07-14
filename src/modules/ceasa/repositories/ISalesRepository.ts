import Sale from "../infra/typeorm/entities/Sale";

interface ISalesRepository {
  findAll(): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;
  findByIdOrFail(id: string): Promise<Sale>;
  save(data: Sale): Promise<Sale>;
  delete(id: string): Promise<void>;
}

export default ISalesRepository;