import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import SaleItem from "@modules/ceasa/infra/typeorm/entities/SaleItem";
import SaleItemsRepository from "@modules/ceasa/infra/typeorm/repositories/SaleItemsRepository";
import SalesRepository from "@modules/ceasa/infra/typeorm/repositories/SalesRepository";
import validateSale from "@modules/ceasa/validations/validateSale";
import HarvestsRepository from "@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository";
import { inject, injectable } from "tsyringe";

interface IUpdateSaleData {
  id: string;
  date: Date;
  totalValue: number;
  paymentStatus: 'paid' | 'pending';
  deliveryStatus: 'completed' | 'waiting';
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
    private salesRepository: SalesRepository,

    @inject('SaleItemsRepository')
    private saleItemsRepository: SaleItemsRepository,

    @inject('HarvestsRepository')
    private harvestsRepository: HarvestsRepository
  ) {}

  async execute(data: IUpdateSaleData): Promise<Sale> {
    const { id } = data;
    
    const findedSale = await this.salesRepository.findByIdOrFail(id);
    const oldSaleItems = [ ...findedSale.saleItems ];
    const newSaleItems = [ ...data.saleItems ];
    
    if (data.date === null) data.date = undefined;
    Object.assign(findedSale, data);
    delete findedSale.saleItems;
    delete findedSale.client;
    
    // Save sale
    await validateSale(data as Sale);
    const savedSale = await this.salesRepository.save(findedSale);

    // Remove sale items
    const saleItemsToRemove = oldSaleItems.filter(
      saleItem => !this.getIdsOf(newSaleItems).includes(saleItem.id)
    );

    for (const saleItem of saleItemsToRemove) {
      await this.saleItemsRepository.delete(saleItem.id);

      const findedHarvest = await this.harvestsRepository.findByIdOrFail(saleItem.harvestId);
      findedHarvest.inStock += saleItem.quantity;
      await this.harvestsRepository.save(findedHarvest);
    }

    // Update and create sale items
    for (const saleItem of newSaleItems) {
      const data = new SaleItem();
      Object.assign(data, saleItem);

      if (!data.id) data.saleId = savedSale.id;

      await this.saleItemsRepository.save(data);

      const findedHarvest = await this.harvestsRepository.findByIdOrFail(saleItem.harvestId);
      const oldQuantity = this.getFromArray(oldSaleItems, saleItem.id)?.quantity;
      findedHarvest.inStock += (oldQuantity || 0) - saleItem.quantity;
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