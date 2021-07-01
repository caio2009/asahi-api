import Unit from '@modules/rural-property-management/infra/typeorm/entities/Unit';
import { Request, Response } from "express";
import { inject, injectable } from 'tsyringe';
import IUnitsRepository from '@modules/rural-property-management/repositories/IUnitsRepository';
import validateUnit from '@modules/rural-property-management/validations/validateUnit';

@injectable()
class UnitsController {
  constructor(
    @inject('UnitsRepository')
    private repository: IUnitsRepository
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
    const { name, abbreviation } = req.body;
    const unit = new Unit();
    Object.assign(unit, { name, abbreviation });
    await validateUnit(unit);
    const result = await this.repository.save(unit);
    res.location(`http://localhost:3333/units/${result.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const unit = await this.repository.findByIdOrFail(id);
    const { name, abbreviation } = req.body;
    Object.assign(unit, { name, abbreviation });
    await this.repository.save(unit);
    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.repository.findByIdOrFail(id);
    await this.repository.delete(id);
    return res.status(204).send();
  }
}

export default UnitsController;