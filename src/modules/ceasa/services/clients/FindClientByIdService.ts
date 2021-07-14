import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import ClientsRepository from "@modules/ceasa/infra/typeorm/repositories/ClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindClientByIdService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: ClientsRepository
  ) {}

  async execute(id: string): Promise<Client> {
    return await this.clientsRepository.findByIdOrFail(id);
  }
}

export default FindClientByIdService;