import { Request, Response } from 'express';
import FindSalePageService from "@modules/ceasa/services/sales/FindSalePageService";
import { container } from "tsyringe";

class SalePagesController {
  async index(req: Request, res: Response) {
    const { page, limit } = req.query;
    const defaultLimit = 20;

    const findPage = container.resolve(FindSalePageService);
    const sales = await findPage.execute(Number(page), limit ? Number(limit) : defaultLimit);

    return res.json(sales);
  }
}

export default SalePagesController;