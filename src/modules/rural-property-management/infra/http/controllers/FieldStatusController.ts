import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
class FieldStatusController {
  constructor(
    @inject('FieldsRepository')
    private repository: IFieldsRepository
  ) { }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const field = await this.repository.findByIdOrFail(id);

    if (status === 'opened') {
      field.closedAt = null;
      await this.repository.save(field);
      return res.status(204).send();
    }

    if (status === 'closed') {
      field.closedAt = new Date();
      await this.repository.save(field);
      return res.status(204).send();
    }

    throw new AppError(400, 'Bad Request!');
  }
}

export default FieldStatusController;