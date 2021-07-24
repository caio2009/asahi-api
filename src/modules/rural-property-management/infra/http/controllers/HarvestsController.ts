import CreateHarvestService from "@modules/rural-property-management/services/harvests/CreateHarvestService";
import DeleteHarvestService from "@modules/rural-property-management/services/harvests/DeleteHarvestService";
import FindAllHarvestsMappedByDateService from "@modules/rural-property-management/services/harvests/FindAllHarverstsMappedByDateService";
import FindHarvestByIdService from "@modules/rural-property-management/services/harvests/FindHarverstByIdService";
import UpdateHarvestService from "@modules/rural-property-management/services/harvests/UpdateHarvestService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class HarvestsController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllHarvestsMappedByDateService);
    const harvests = await findAll.execute();

    return res.json(harvests);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindHarvestByIdService);
    const harvest = await findById.execute(id);

    return res.json(harvest);
  }

  async create(req: Request, res: Response) {
    const { date, quantity, fieldId, classificationId, unitId } = req.body;

    const createHarvest = container.resolve(CreateHarvestService);
    const harvest = await createHarvest.execute({ date, quantity, fieldId, classificationId, unitId });

    res.location(`${process.env.API_URL}/harvests/${harvest.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { date, quantity, fieldId, classificationId, unitId } = req.body;

    const updateHarvest = container.resolve(UpdateHarvestService);
    await updateHarvest.execute({ id, date, quantity, fieldId, classificationId, unitId });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteHarvest = container.resolve(DeleteHarvestService);
    await deleteHarvest.execute(id);

    return res.status(204).send();
  }
}

export default HarvestsController;