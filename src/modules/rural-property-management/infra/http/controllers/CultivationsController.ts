import { Request, Response } from "express";
import { container, inject, injectable } from 'tsyringe';
import FindAllCultivationsService from '@modules/rural-property-management/services/cultivations/FindAllCultivationsService';
import FindCultivationByIdService from '@modules/rural-property-management/services/cultivations/FindCultivationByIdService';
import CreateCultivationService from '@modules/rural-property-management/services/cultivations/CreateCultivationService';
import UpdateCultivationService from '@modules/rural-property-management/services/cultivations/UpdateCultivationService';
import DeleteCultivationService from '@modules/rural-property-management/services/cultivations/DeleteCultivationService';

@injectable()
class CultivationsController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllCultivationsService);
    const cultivations = await findAll.execute();

    return res.json(cultivations);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindCultivationByIdService);
    const cultivation = await findById.execute(id);

    return res.json(cultivation);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const file = req.file;

    const createCultivation = container.resolve(CreateCultivationService);
    const cultivation = await createCultivation.execute({ name, imageFilename: file?.filename });

    res.location(`${process.env.API_URL}/cultivations/${cultivation.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;

    const updateCultivation = container.resolve(UpdateCultivationService);
    await updateCultivation.execute({ id, name, imageFilename: file?.filename });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteCultivation = container.resolve(DeleteCultivationService);
    await deleteCultivation.execute(id);

    return res.status(204).send();
  }
}

export default CultivationsController;