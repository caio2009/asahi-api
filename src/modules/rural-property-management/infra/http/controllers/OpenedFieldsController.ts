import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import { Request, Response } from 'express';
import { inject, injectable } from "tsyringe";

@injectable()
class OpenedFieldsController {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) { }

  async index(req: Request, res: Response) {
    const result = await this.fieldsRepository.findOpened();
    return res.json(result);
  }
}

export default OpenedFieldsController;