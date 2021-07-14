import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import ClientsRepository from "@modules/ceasa/infra/typeorm/repositories/ClientsRepository";
import validateClient from "@modules/ceasa/validations/validateClient";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IUpdateClientData {
  id: string;
  name: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: ClientsRepository
  ) {}

  async execute(data: IUpdateClientData): Promise<Client> {
    const { id, name } = data;

    await this.clientsRepository.findByIdOrFail(id);

    const finded = await this.clientsRepository.findByName(name);
    if (finded && finded.id !== id) throw new AppError(409, 'Client with this name already exists!');

    await validateClient(data);
    return await this.clientsRepository.save(data);
  }
}

export default UpdateClientService;