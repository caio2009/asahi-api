import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import SaleItem from "@modules/ceasa/infra/typeorm/entities/SaleItem";
import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
import ISaleItemsRepository from "@modules/ceasa/repositories/ISaleItemsRepository";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import validateSale from "@modules/ceasa/validations/validateSale";
import IHarvestsRepository from "@modules/rural-property-management/repositories/IHarvestsRepository";
import { inject, injectable } from "tsyringe";

export interface IUpdateSaleData {
  id: string;
  date: Date;
  totalValue: number;
  paymentStatus: 'paid' | 'pending';
  deliveryStatus: 'dispatched' | 'waiting';
  clientName: string;
  clientId: string;
  saleItems: Array<{
    id: string;
    unitPrice: number;
    quantity: number;
    harvestId: string;
  }>;
}

@injectable()
class UpdateSaleService {
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

  async execute(data: IUpdateSaleData): Promise<Sale> {
    await validateSale(data);
    
    const sale = await this.salesRepository.findByIdOrFail(data.id);
    sale.date = data.date || undefined;
    sale.totalValue = data.totalValue;
    sale.paymentStatus = data.paymentStatus;
    sale.deliveryStatus = data.deliveryStatus;
    sale.clientName = data.clientName;
    
    if (data.clientId) sale.client = await this.clientsRepository.findByIdOrFail(data.clientId);

    // Save sale
    const savedSale = await this.salesRepository.save(sale);

    // Remove sale items
    const saleItemsToRemove = sale.saleItems.filter(
      saleItem => !this.getIdsOf(data.saleItems).includes(saleItem.id)
    );

    for (const item of saleItemsToRemove) {
      await this.saleItemsRepository.delete(item.id);

      const findedHarvest = await this.harvestsRepository.findByIdOrFail(item.harvest.id);
      findedHarvest.inStock += item.quantity;
      await this.harvestsRepository.save(findedHarvest);
    }

    // Update and create sale items
    for (const item of data.saleItems) {
      const obj = new SaleItem();
      obj.quantity = item.quantity;
      obj.unitPrice = item.unitPrice;
      obj.sale = savedSale;

      if (!obj.id) obj.sale = savedSale;

      const harvest = await this.harvestsRepository.findByIdOrFail(item.harvestId);
      obj.harvest = harvest;

      await this.saleItemsRepository.save(obj);

      const findedHarvest = await this.harvestsRepository.findByIdOrFail(item.harvestId);
      const oldQuantity = this.getFromArray(sale.saleItems, item.id)?.quantity;
      findedHarvest.inStock += (oldQuantity || 0) - item.quantity;
      await this.harvestsRepository.save(findedHarvest);
    }

    return savedSale;
  }

  private getIdsOf(array: any): string[] {
    return array.map((el: any) => el.id as string);
  }

  private getFromArray(array: any, id: string): any {
    return array.find((el: any) => el.id === id);
  }
}

export default UpdateSaleService;