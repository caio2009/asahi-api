import Cultivation from '@modules/rural-property-management/infra/typeorm/entities/Cultivation';
import { Request, Response } from "express";
import { inject, injectable } from 'tsyringe';
import ICultivationsRepository from '@modules/rural-property-management/repositories/ICultivationsRepository';
import validateCultivation from '@modules/rural-property-management/validations/validateCultivation';

@injectable()
class CultivationsController {
  constructor(
    @inject('CultivationsRepository')
    private repository: ICultivationsRepository
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
    const cultivation = new Cultivation();
    Object.assign(cultivation, { name });
    await validateCultivation(cultivation);
    const result = await this.repository.save(cultivation);
    res.location(`http://localhost:3333/cultivations/${result.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const cultivation = await this.repository.findByIdOrFail(id);
    const { name } = req.body;
    Object.assign(cultivation, { name });
    await this.repository.save(cultivation);
    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.repository.findByIdOrFail(id);
    await this.repository.delete(id);
    return res.status(204).send();
  }
}

export default CultivationsController;