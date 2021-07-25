import ChangeSaleDeliveryStatusService from '@modules/ceasa/services/sales/ChangeSaleDeliveryStatusService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SalesDeliveryStatusController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { deliveryStatus } = req.body;

    const changeDeliveryStatus = container.resolve(ChangeSaleDeliveryStatusService);
    changeDeliveryStatus.execute({ id, deliveryStatus });

    return res.status(204).send();
  }
}

export default SalesDeliveryStatusController;