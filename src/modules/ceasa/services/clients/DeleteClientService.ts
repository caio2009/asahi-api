import ClientsRepository from "@modules/ceasa/infra/typeorm/repositories/ClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteClientService {
  constructor (
    @inject('ClientsRepository')
    private clientsRepository: ClientsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.clientsRepository.findByIdOrFail(id);
    await this.clientsRepository.delete(id);
  }
}

export default DeleteClientService;