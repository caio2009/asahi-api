import IStockItemDetailsDTO from "../dtos/IStockItemDetailsDTO";
import IStockItemDTO from "../dtos/IStockItemDTO";

interface IStockRepository {
  findAll(): Promise<IStockItemDTO[]>;
  findStockItemDetails(data: { 
    cultivationId: string, 
    classificationId: string, 
    unitId: string 
  }): Promise<IStockItemDetailsDTO | undefined>;
}

export default IStockRepository;