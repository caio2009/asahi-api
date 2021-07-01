import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import { Request, Response } from 'express';
import { inject, injectable } from "tsyringe";

@injectable()
class ClosedFieldsController {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) { }

  async index(req: Request, res: Response) {
    const result = await this.fieldsRepository.findClosed();
    return res.json(result);
  }
}

export default ClosedFieldsController;