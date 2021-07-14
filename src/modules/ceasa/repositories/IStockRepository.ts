import IStockItemDTO from "../dtos/IStockItemDTO";

interface IStockRepository {
  findAll(): Promise<IStockItemDTO[]>;
}

export default IStockRepository;