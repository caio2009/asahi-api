import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import SaleItem from "@modules/ceasa/infra/typeorm/entities/SaleItem";
import SaleItemsRepository from "@modules/ceasa/infra/typeorm/repositories/SaleItemsRepository";
import SalesRepository from "@modules/ceasa/infra/typeorm/repositories/SalesRepository";
import validateSale from "@modules/ceasa/validations/validateSale";
import HarvestsRepository from "@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository";
import { inject, injectable } from "tsyringe";

interface ICreateSaleData {
  date: Date;
  totalValue: number;
  paymentStatus: 'paid' | 'pending';
  deliveryStatus: 'completed' | 'waiting';
  clientName: string;
  clientId: string;
  saleItems: Array<{
    unitPrice: number;
    quantity: number;
    harvestId: string;
  }>;
}

@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepository,

    @inject('SaleItemsRepository')
    private saleItemsRepository: SaleItemsRepository,

    @inject('HarvestsRepository')
    private harvestsRepository: HarvestsRepository
  ) {}

  async execute(data: ICreateSaleData): Promise<Sale> {
    const saleItems = [ ...data.saleItems ];

    if (data.date === null) data.date = undefined;
    delete data.saleItems;

    await validateSale(data as Sale);
    const savedSale = await this.salesRepository.save(data as Sale);

    for (const saleItem of saleItems) {
      const data = new SaleItem();
      Object.assign(data, saleItem);
      data.saleId = savedSale.id;

      await this.saleItemsRepository.save(data);

      const findedHarvest = await this.harvestsRepository.findByIdOrFail(saleItem.harvestId);
      findedHarvest.inStock -= saleItem.quantity;
      await this.harvestsRepository.save(findedHarvest);
    }

    return savedSale;
  }
}

export default CreateSaleService;