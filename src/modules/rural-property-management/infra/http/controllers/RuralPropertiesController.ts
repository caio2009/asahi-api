import RuralProperty from '@modules/rural-property-management/infra/typeorm/entities/RuralProperty';
import { Request, Response } from "express";
import { inject, injectable } from 'tsyringe';
import IRuralPropertiesRepository from '@modules/rural-property-management/repositories/IRuralPropertiesRepository';
import validateRuralProperty from '@modules/rural-property-management/validations/validateRuralProperty';

@injectable()
class RuralPropertiesController {
  constructor(
    @inject('RuralPropertiesRepository')
    private repository: IRuralPropertiesRepository
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
    const { name, description } = req.body;
    const ruralProperty = new RuralProperty();
    Object.assign(ruralProperty, { name, description });
    await validateRuralProperty(ruralProperty);
    const result = await this.repository.save(ruralProperty);
    res.location(`http://localhost:3333/rural-properties/${result.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const ruralProperty = await this.repository.findByIdOrFail(id);
    const { name, description } = req.body;
    Object.assign(ruralProperty, { name, description });
    await this.repository.save(ruralProperty);
    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.repository.findByIdOrFail(id);
    await this.repository.delete(id);
    return res.status(204).send();
  }
}

export default RuralPropertiesController;