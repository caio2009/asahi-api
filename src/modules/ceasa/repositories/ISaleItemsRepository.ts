import SaleItem from "../infra/typeorm/entities/SaleItem";

interface ISaleItemsRepository {
  findAll(): Promise<SaleItem[]>;
  findById(id: string): Promise<SaleItem | undefined>;
  findByIdOrFail(id: string): Promise<SaleItem>;
  save(data: SaleItem): Promise<SaleItem>;
  delete(id: string): Promise<void>;
}

export default ISaleItemsRepository;