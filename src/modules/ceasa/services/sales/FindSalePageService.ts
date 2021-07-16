import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindSalePageService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute(page: number, limit = 20): Promise<Sale[]> {
    if (page === undefined) throw new AppError(400, 'Page value is required!');

    if (page <= 0) throw new AppError(400, 'Page value must be positive!');
    if (limit <= 0) throw new AppError(400, 'Limit value must be positive!');

    return await this.salesRepository.findPage(page, limit);
  }
}

export default FindSalePageService;