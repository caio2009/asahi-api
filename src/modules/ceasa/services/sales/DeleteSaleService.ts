import SaleItemsRepository from "@modules/ceasa/infra/typeorm/repositories/SaleItemsRepository";
import SalesRepository from "@modules/ceasa/infra/typeorm/repositories/SalesRepository";
import HarvestsRepository from "@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepository,

    @inject('SaleItemsRepository')
    private saleItemsRepository: SaleItemsRepository,

    @inject('HarvestsRepository')
    private harvestsRepository: HarvestsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const sale = await this.salesRepository.findByIdOrFail(id);

    for (const item of sale.saleItems) {
      const findedHarvest = await this.harvestsRepository.findByIdOrFail(item.harvest.id);
      findedHarvest.inStock += item.quantity;
      await this.harvestsRepository.save(findedHarvest);

      await this.saleItemsRepository.delete(item.id);
    }

    await this.salesRepository.delete(sale.id);
  }
}

export default DeleteSaleService;