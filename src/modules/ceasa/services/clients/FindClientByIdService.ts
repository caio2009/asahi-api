import Client from "@modules/ceasa/infra/typeorm/entities/Client";
import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindClientByIdService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<Client> {
    return await this.clientsRepository.findByIdOrFail(id);
  }
}

export default FindClientByIdService;