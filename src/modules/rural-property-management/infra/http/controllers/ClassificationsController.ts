import Classification from '@modules/rural-property-management/infra/typeorm/entities/Classification';
import { Request, Response } from "express";
import { inject, injectable } from 'tsyringe';
import IClassificationsRepository from '@modules/rural-property-management/repositories/IClassificationsRepository';
import validateClassification from '@modules/rural-property-management/validations/validateClassification';

@injectable()
class ClassificationsController {
  constructor(
    @inject('ClassificationsRepository')
    private repository: IClassificationsRepository
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
    const { name } = req.body;
    const classification = new Classification();
    Object.assign(classification, { name });
    await validateClassification(classification);
    const result = await this.repository.save(classification);
    res.location(`http://localhost:3333/classifications/${result.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const classification = await this.repository.findByIdOrFail(id);
    const { name } = req.body;
    Object.assign(classification, { name });
    await this.repository.save(classification);
    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.repository.findByIdOrFail(id);
    await this.repository.delete(id);
    return res.status(204).send();
  }
}

export default ClassificationsController;