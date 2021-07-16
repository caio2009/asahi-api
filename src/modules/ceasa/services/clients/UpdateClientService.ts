import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
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
    private clientsRepository: IClientsRepository
  ) {}

  async execute(data: IUpdateClientData): Promise<Client> {
    const finded = await this.clientsRepository.findByName(data.name);
    if (finded && finded.id !== data.id) throw new AppError(409, 'Client with this name already exists!');
    
    const obj = await this.clientsRepository.findByIdOrFail(data.id);
    obj.name = data.name;

    await validateClient(obj);
    return await this.clientsRepository.save(obj);
  }
}

export default UpdateClientService;