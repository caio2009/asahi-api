import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllSalesService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute(): Promise<Sale[]> {
    return await this.salesRepository.findAll();
  }
}

export default FindAllSalesService;