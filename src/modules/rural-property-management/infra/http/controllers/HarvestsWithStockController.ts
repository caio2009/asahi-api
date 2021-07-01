import HarvestsRepository from '@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository';
import { Request, Response } from 'express';
import { inject, injectable } from "tsyringe";

@injectable()
class HarvestsWithStockController {
  constructor(
    @inject('HarvestsRepository')
    private repository: HarvestsRepository
  ) { }

  async index(req: Request, res: Response) {
    const result = await this.repository.findWithStock();
    return res.json(result);
  }
}

export default HarvestsWithStockController;