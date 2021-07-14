import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Client from "../entities/Client";

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  async findAll(): Promise<Client[]> {
    return await this.repository.find({
      order: { name: 'ASC' }
    });
  }

  async findById(id: string): Promise<Client> {
    return await this.repository.findOne(id);
  }

  async findByIdOrFail(id: string): Promise<Client> {
    const result = await this.repository.findOne(id);
    if (!result) throw new AppError(404, 'Client not found!');
    return result;
  }

  async findByName(name: string): Promise<Client> {
    return await this.repository.findOne({ name });
  }

  async save(data: Client): Promise<Client> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ClientsRepository;