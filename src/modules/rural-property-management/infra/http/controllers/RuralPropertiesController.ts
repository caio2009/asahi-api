import CreateRuralPropertyService from "@modules/rural-property-management/services/ruralProperties/CreateRuralPropertyService";
import DeleteRuralPropertyService from "@modules/rural-property-management/services/ruralProperties/DeleteRuralPropertyService";
import FindAllRuralPropertiesService from "@modules/rural-property-management/services/ruralProperties/findAllRuralPropertiesService";
import FindRuralPropertyByIdService from "@modules/rural-property-management/services/ruralProperties/FindRuralPropertyByIdService";
import UpdateRuralPropertyService from "@modules/rural-property-management/services/ruralProperties/UpdateRuralPropertyService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class RuralPropertiesController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllRuralPropertiesService);
    const ruralProperties = await findAll.execute();

    return res.json(ruralProperties);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindRuralPropertyByIdService);
    const ruralProperty = await findById.execute(id);

    return res.json(ruralProperty);
  }

  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const createRuralProperty = container.resolve(CreateRuralPropertyService);
    const ruralProperty = await createRuralProperty.execute({ name, description });

    res.location(`${process.env.API_URL}/ruralProperties/${ruralProperty.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateRuralProperty = container.resolve(UpdateRuralPropertyService);
    await updateRuralProperty.execute({ id, name, description});

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteRuralProperty = container.resolve(DeleteRuralPropertyService);
    await deleteRuralProperty.execute(id);

    return res.status(204).send();
  }
}

export default RuralPropertiesController;