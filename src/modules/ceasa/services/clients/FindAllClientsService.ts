import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(): Promise<Client[]> {
    return await this.clientsRepository.findAll();
  }
}

export default FindAllClientsService;