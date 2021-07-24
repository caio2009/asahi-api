import FindSalesByClientName from '@modules/ceasa/services/sales/FindSalesByClientName';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SearchSalesController {
  async index(req: Request, res: Response) {
    const { filter } = req.query;
    const defaultLimit = 10;

    if (filter === 'clientName') {
      let { clientName, page, limit } = req.query;

      const findByClientName = container.resolve(FindSalesByClientName);
      const sales = await findByClientName.execute(String(clientName), { 
        page: Number(page), 
        limit: Number(limit) || defaultLimit
      });

      res.json(sales);
    }
  }
}

export default SearchSalesController;