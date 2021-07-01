import IRuralPropertiesRepository from '@modules/rural-property-management/repositories/IRuralPropertiesRepository';
import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import { Request, Response } from 'express';
import { inject, injectable } from "tsyringe";

@injectable()
class RuralPropertyFieldsController {
  constructor(
    @inject('RuralPropertiesRepository')
    private ruralPropertiesRepository: IRuralPropertiesRepository,

    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) { }

  async index(req: Request, res: Response) {
    const { id } = req.params;
    await this.ruralPropertiesRepository.findByIdOrFail(id);
    const result = await this.fieldsRepository.findByRuralProperty(id);
    return res.json(result);
  }
}

export default RuralPropertyFieldsController;