import IStockItemDTO from "@modules/ceasa/dtos/IStockItemDTO";
import StockRepository from "@modules/ceasa/infra/typeorm/repositories/StockRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: StockRepository
  ) {}

  async execute(): Promise<IStockItemDTO[]> {
    return await this.stockRepository.findAll();
  }
}

export default FindAllStockService;