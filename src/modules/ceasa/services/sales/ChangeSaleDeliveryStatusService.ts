import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import { inject, injectable } from "tsyringe";

interface IChangeDeliveryStatusData {
  id: string;
  deliveryStatus: 'dispatched' | 'waiting'
}

@injectable()
class ChangeSaleDeliveryStatusService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) { }

  async execute(data: IChangeDeliveryStatusData): Promise<void> {
    const { id, deliveryStatus } = data;

    const sale = await this.salesRepository.findByIdOrFail(id);
    sale.deliveryStatus = deliveryStatus;

    await this.salesRepository.save(sale);
  }
}

export default ChangeSaleDeliveryStatusService;