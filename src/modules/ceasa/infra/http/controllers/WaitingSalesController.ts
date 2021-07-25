import FindWaitingSalesService from '@modules/ceasa/services/sales/FindWaitingSalesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class WaitingSalesController {
  async index(req: Request, res: Response) {
    const findWaiting = container.resolve(FindWaitingSalesService);
    const sales = await findWaiting.execute();

    res.json(sales);
  }
}

export default WaitingSalesController;