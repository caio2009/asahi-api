import Field from '@modules/rural-property-management/infra/typeorm/entities/Field';
import { Request, Response } from "express";
import { container, inject, injectable } from 'tsyringe';
import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import validateField from '@modules/rural-property-management/validations/validateField';
import CreateFieldService from '@modules/rural-property-management/services/CreateFieldService';
import UpdateFieldService from '@modules/rural-property-management/services/UpdateFieldService';

@injectable()
class FieldsController {
  constructor(
    @inject('FieldsRepository')
    private repository: IFieldsRepository
  ) { }

  async index(req: Request, res: Response) {
    const result = await this.repository.findAll();
    return res.json(result);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.repository.findByIdOrFail(id);
    return res.json(result);
  }

  async create(req: Request, res: Response) {
    const { name, ruralPropertyId, cultivationId } = req.body;
    const field = new Field();
    Object.assign(field, { name, ruralPropertyId, cultivationId });
    await validateField(field);
    const createField = container.resolve(CreateFieldService);
    const result = await createField.execute(field);
    res.location(`http://localhost:3333/fields/${result.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const field = await this.repository.findByIdOrFail(id);
    const { name, ruralPropertyId, cultivationId } = req.body;
    Object.assign(field, { name, ruralPropertyId, cultivationId });
    const updateField = container.resolve(UpdateFieldService);
    await updateField.execute(field);
    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.repository.findByIdOrFail(id);
    await this.repository.delete(id);
    return res.status(204).send();
  }
}

export default FieldsController;