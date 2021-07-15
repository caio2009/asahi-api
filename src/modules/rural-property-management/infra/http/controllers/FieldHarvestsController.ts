import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import HarvestsRepository from '@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository';
import FieldsRepository from '@modules/rural-property-management/infra/typeorm/repositories/FieldsRepository';

@injectable()
class FieldHarvestsController {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: FieldsRepository,

    @inject('HarvestsRepository')
    private harvestsRepository: HarvestsRepository
  ) {}

  async index(req: Request, res: Response) {
    const { id } = req.params;

    await this.fieldsRepository.findByIdOrFail(id);
    const result = await this.harvestsRepository.findByField(id);

    return res.json(result);
  }
}

export default FieldHarvestsController;