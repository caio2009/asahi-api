import IStockItemDTO from "@modules/ceasa/dtos/IStockItemDTO";
import IStockRepository from "@modules/ceasa/repositories/IStockRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  async execute(): Promise<IStockItemDTO[]> {
    return await this.stockRepository.findAll();
  }
}

export default FindAllStockService;