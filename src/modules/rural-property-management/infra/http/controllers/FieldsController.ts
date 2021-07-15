import CreateFieldService from "@modules/rural-property-management/services/fields/CreateFieldService";
import DeleteFieldService from "@modules/rural-property-management/services/fields/DeleteFieldService";
import FindAllFieldsService from "@modules/rural-property-management/services/fields/FindAllFieldsService";
import FindFieldByIdService from "@modules/rural-property-management/services/fields/FindFieldbyIdService";
import UpdateFieldService from "@modules/rural-property-management/services/fields/UpdateFieldService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class FieldsController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllFieldsService);
    const fields = await findAll.execute();

    return res.json(fields);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindFieldByIdService);
    const field = await findById.execute(id);

    return res.json(field);
  }

  async create(req: Request, res: Response) {
    const { name, ruralPropertyId, cultivationId } = req.body;

    const createField = container.resolve(CreateFieldService);
    const field = await createField.execute({ name, ruralPropertyId, cultivationId });

    res.location(`${process.env.API_URL}/fields/${field.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, ruralPropertyId, cultivationId } = req.body;

    const updateField = container.resolve(UpdateFieldService);
    await updateField.execute({ id, name, ruralPropertyId, cultivationId });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteField = container.resolve(DeleteFieldService);
    await deleteField.execute(id);

    return res.status(204).send();
  }
}

export default FieldsController;