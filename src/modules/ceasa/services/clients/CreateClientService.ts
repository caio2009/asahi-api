import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import ClientsRepository from "@modules/ceasa/infra/typeorm/repositories/ClientsRepository";
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
    private clientsRepository: ClientsRepository
  ) {}

  async execute(data: ICreateClientData): Promise<Client> {
    const { name } = data;

    const finded = await this.clientsRepository.findByName(name);
    if (finded) throw new AppError(409, 'Client with this name already exists!');

    await validateClient(data);
    return await this.clientsRepository.save(data);
  }
}

export default CreateClientService;