import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindSalesByClientName {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) {}

  async execute(clientName: string, options: { page: number, limit: number }): Promise<Sale[]> {
    const { page, limit } = options;

    if (page === undefined) throw new AppError(400, 'Page value is required!');

    if (page <= 0) throw new AppError(400, 'Page value must be positive!');
    if (limit <= 0) throw new AppError(400, 'Limit value must be positive!');

    return await this.salesRepository.findByClientName(clientName, { page, limit });
  }
}

export default FindSalesByClientName;