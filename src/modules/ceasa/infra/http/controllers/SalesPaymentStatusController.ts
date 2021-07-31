import ChangeSalePaymentStatusService from '@modules/ceasa/services/sales/ChangeSalePaymentStatusService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SalesPaymentStatusController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const changeDeliveryStatus = container.resolve(ChangeSalePaymentStatusService);
    changeDeliveryStatus.execute({ id, paymentStatus });

    return res.status(204).send();
  }
}

export default SalesPaymentStatusController;