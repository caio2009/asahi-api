import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import SaleItem from "@modules/ceasa/infra/typeorm/entities/SaleItem";
import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
import ISaleItemsRepository from "@modules/ceasa/repositories/ISaleItemsRepository";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import validateSale from "@modules/ceasa/validations/validateSale";
import IHarvestsRepository from "@modules/rural-property-management/repositories/IHarvestsRepository";
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
    private salesRepository: ISalesRepository,

    @inject('SaleItemsRepository')
    private saleItemsRepository: ISaleItemsRepository,

    @inject('HarvestsRepository')
    private harvestsRepository: IHarvestsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(data: ICreateSaleData): Promise<Sale> {
    const obj = new Sale();
    obj.date = data.date || undefined;
    obj.totalValue = data.totalValue;
    obj.paymentStatus = data.paymentStatus;
    obj.deliveryStatus = data.deliveryStatus;
    obj.clientName = data.clientName;

    if (data.clientId) obj.client = await this.clientsRepository.findByIdOrFail(data.clientId);

    await validateSale(obj);
    const savedSale = await this.salesRepository.save(obj);

    for (const item of data.saleItems) {
      const obj = new SaleItem();
      obj.quantity = item.quantity;
      obj.unitPrice = item.unitPrice;
      obj.sale = savedSale;

      const harvest = await this.harvestsRepository.findByIdOrFail(item.harvestId);
      obj.harvest = harvest;

      await this.saleItemsRepository.save(obj);

      harvest.inStock -= item.quantity;
      await this.harvestsRepository.save(harvest);
    }

    return savedSale;
  }
}

export default CreateSaleService;