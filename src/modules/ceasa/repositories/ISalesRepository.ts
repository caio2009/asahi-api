import ISalesMappedByDateDTO from "../dtos/ISalesMappedByDateDTO";
import Sale from "../infra/typeorm/entities/Sale";

interface ISalesRepository {
  findAll(): Promise<ISalesMappedByDateDTO[]>;
  findById(id: string): Promise<Sale | undefined>;
  findByIdOrFail(id: string): Promise<Sale>;
  findPage(page: number, limit: number): Promise<Sale[]>;
  findByClientName(clientName: string, options: { page: number; limit: number; }): Promise<Sale[]>;
  save(data: Sale): Promise<Sale>;
  delete(id: string): Promise<void>;
}

export default ISalesRepository;