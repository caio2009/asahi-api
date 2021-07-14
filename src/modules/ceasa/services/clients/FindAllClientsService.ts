import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import ClientsRepository from "@modules/ceasa/infra/typeorm/repositories/ClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: ClientsRepository
  ) {}

  async execute(): Promise<Client[]> {
    return await this.clientsRepository.findAll();
  }
}

export default FindAllClientsService;