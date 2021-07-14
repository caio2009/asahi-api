import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import SalesRepository from "@modules/ceasa/infra/typeorm/repositories/SalesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllSalesService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepository
  ) {}

  async execute(): Promise<Sale[]> {
    return await this.salesRepository.findAll();
  }
}

export default FindAllSalesService;