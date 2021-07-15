import IStockItemDetailsDTO from "@modules/ceasa/dtos/IStockItemDetailsDTO";
import IStockRepository from "@modules/ceasa/repositories/IStockRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindStockItemDetailsService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  async execute(
    data: { cultivationId: string, classificationId: string, unitId: string }
  ): Promise<IStockItemDetailsDTO> {
    const { cultivationId, classificationId, unitId } = data;

    return await this.stockRepository.findStockItemDetails({
      cultivationId,
      classificationId,
      unitId
    });
  }
}

export default FindStockItemDetailsService;