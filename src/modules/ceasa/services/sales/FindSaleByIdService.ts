import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindSaleByIdService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute(id: string): Promise<Sale> {
    return await this.salesRepository.findByIdOrFail(id);
  }
}

export default FindSaleByIdService;