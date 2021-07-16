import CreateClientService from '@modules/ceasa/services/clients/CreateClientService';
import DeleteClientService from '@modules/ceasa/services/clients/DeleteClientService';
import FindAllClientsService from '@modules/ceasa/services/clients/FindAllClientsService';
import FindClientByIdService from '@modules/ceasa/services/clients/FindClientByIdService';
import UpdateClientService from '@modules/ceasa/services/clients/UpdateClientService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ClientsController {
  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllClientsService);
    const clients = await findAll.execute();

    return res.json(clients);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindClientByIdService);
    const client = await findById.execute(id);

    return res.json(client);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const createClient = container.resolve(CreateClientService);
    const client = await createClient.execute({ name });

    res.location(`${process.env.API_URL}/clients/${client.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const updateClient = container.resolve(UpdateClientService);
    await updateClient.execute({ id, name });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteClient = container.resolve(DeleteClientService);
    await deleteClient.execute(id);

    return res.status(204).send();
  }

}

export default ClientsController;