import Harvest from '@modules/rural-property-management/infra/typeorm/entities/Harvest';
import { Request, Response } from "express";
import { container, inject, injectable } from 'tsyringe';
import IHarvestsRepository from '@modules/rural-property-management/repositories/IHarvestsRepository';
import validateHarvest from '@modules/rural-property-management/validations/validateHarvest';
import CreateHarvestService from '@modules/rural-property-management/services/harvest/CreateHarvestService';
import UpdateHarvestService from '@modules/rural-property-management/services/harvest/UpdateHarvestService';

@injectable()
class HarvestsController {
  constructor(
    @inject('HarvestsRepository')
    private repository: IHarvestsRepository
  ) { }

  async index(req: Request, res: Response) {
    // const result = await this.repository.findAll();
    const result = await this.repository.findAllMappedByDate();
    return res.json(result);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.repository.findByIdOrFail(id);
    return res.json(result);
  }

  async create(req: Request, res: Response) {
    const { date, quantity, fieldId, classificationId, unitId } = req.body;
    const harvest = new Harvest();
    Object.assign(harvest, { date, quantity, fieldId, classificationId, unitId });
    await validateHarvest(harvest);
    const createHarvest = container.resolve(CreateHarvestService);
    const result = await createHarvest.execute(harvest);
    res.location(`http://localhost:3333/harvests/${result.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const harvest = await this.repository.findByIdOrFail(id);
    const { date, quantity, fieldId, classificationId, unitId } = req.body;
    const updateHarvest = container.resolve(UpdateHarvestService);
    await updateHarvest.execute(harvest, { date, quantity, fieldId, classificationId, unitId });
    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.repository.findByIdOrFail(id);
    await this.repository.delete(id);
    return res.status(204).send();
  }
}

export default HarvestsController;