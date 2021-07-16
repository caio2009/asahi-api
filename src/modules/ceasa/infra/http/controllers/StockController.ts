import FindAllStockService from '@modules/ceasa/services/stock/FindAllStockService';
import FindStockItemDetailsService from '@modules/ceasa/services/stock/FindStockItemDetailsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class StockController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllStockService);
    const stock = await findAll.execute();

    return res.json(stock);
  }

  async show(req: Request, res: Response) {
    let { cultivationId, classificationId, unitId } = req.query;

    cultivationId = cultivationId as string;
    classificationId = classificationId as string;
    unitId = unitId as string;

    const findStockItemDetails = container.resolve(FindStockItemDetailsService);
    const details = await findStockItemDetails.execute({ cultivationId, classificationId, unitId });

    return res.json(details);
  }

}

export default StockController;