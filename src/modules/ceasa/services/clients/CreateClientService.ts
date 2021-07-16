import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
import validateClient from "@modules/ceasa/validations/validateClient";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface ICreateClientData {
  name: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(data: ICreateClientData): Promise<Client> {
    const finded = await this.clientsRepository.findByName(data.name);
    if (finded) throw new AppError(409, 'Client with this name already exists!');

    const obj = new Client();
    obj.name = data.name;

    await validateClient(obj);
    return await this.clientsRepository.save(obj);
  }
}

export default CreateClientService;