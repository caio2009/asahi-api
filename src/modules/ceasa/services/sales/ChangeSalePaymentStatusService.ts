import Sale from "@modules/ceasa/infra/typeorm/entities/Sale";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import { inject, injectable } from "tsyringe";

interface IChangePaymentStatusData {
  id: string;
  paymentStatus: 'paid' | 'pending'
}

@injectable()
class ChangeSalePaymentStatusService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository
  ) { }

  async execute(data: IChangePaymentStatusData): Promise<void> {
    const { id, paymentStatus } = data;

    const sale = await this.salesRepository.findByIdOrFail(id);
    sale.paymentStatus = paymentStatus;

    await this.salesRepository.save(sale);
  }
}

export default ChangeSalePaymentStatusService;