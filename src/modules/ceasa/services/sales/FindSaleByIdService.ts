import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import SalesRepository from "@modules/ceasa/infra/typeorm/repositories/SalesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindSaleByIdService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepository
  ) {}

  async execute(id: string): Promise<Sale> {
    return await this.salesRepository.findByIdOrFail(id);
  }
}

export default FindSaleByIdService;