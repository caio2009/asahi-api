import FindAllStockService from '@modules/ceasa/services/stock/FindAllStockService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StockController {

  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllStockService);
    const stock = await findAll.execute();

    return res.json(stock);
  }

}

export default StockController;