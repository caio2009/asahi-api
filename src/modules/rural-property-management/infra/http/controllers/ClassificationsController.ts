import CreateClassificationService from "@modules/rural-property-management/services/classifications/CreateClassificationService";
import DeleteClassificationService from "@modules/rural-property-management/services/classifications/DeleteClassificationService";
import FindAllClassificationsService from "@modules/rural-property-management/services/classifications/FindAllClassificationsService";
import FindClassificationByIdService from "@modules/rural-property-management/services/classifications/FindClassificationByIdService";
import UpdateClassificationService from "@modules/rural-property-management/services/classifications/UpdateClassificationService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ClassificationsController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllClassificationsService);
    const classifications = await findAll.execute();

    return res.json(classifications);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindClassificationByIdService);
    const classification = await findById.execute(id);

    return res.json(classification);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const createClassification = container.resolve(CreateClassificationService);
    const classification = await createClassification.execute({ name });

    res.location(`${process.env.API_URL}/classifications/${classification.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const updateClassification = container.resolve(UpdateClassificationService);
    await updateClassification.execute({ id, name });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteClassification = container.resolve(DeleteClassificationService);
    await deleteClassification.execute(id);

    return res.status(204).send();
  }
}

export default ClassificationsController;