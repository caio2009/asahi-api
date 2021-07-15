import CreateUnitService from "@modules/rural-property-management/services/units/CreateUnitService";
import DeleteUnitService from "@modules/rural-property-management/services/units/DeleteUnitService";
import FindAllUnitsService from "@modules/rural-property-management/services/units/FindAllUnitsService";
import FindUnitByIdService from "@modules/rural-property-management/services/units/FindUnitByIdService";
import UpdateUnitService from "@modules/rural-property-management/services/units/UpdateUnitService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UnitsController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllUnitsService);
    const units = await findAll.execute();

    return res.json(units);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindUnitByIdService);
    const unit = await findById.execute(id);

    return res.json(unit);
  }

  async create(req: Request, res: Response) {
    const { name, abbreviation } = req.body;

    const createUnit = container.resolve(CreateUnitService);
    const unit = await createUnit.execute({ name, abbreviation });

    res.location(`${process.env.API_URL}/units/${unit.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, abbreviation } = req.body;

    const updateUnit = container.resolve(UpdateUnitService);
    await updateUnit.execute({ id, name, abbreviation });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUnit = container.resolve(DeleteUnitService);
    await deleteUnit.execute(id);

    return res.status(204).send();
  }
}

export default UnitsController;