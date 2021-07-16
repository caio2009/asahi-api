import IClientsRepository from "@modules/ceasa/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteClientService {
  constructor (
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.clientsRepository.findByIdOrFail(id);
    await this.clientsRepository.delete(id);
  }
}

export default DeleteClientService;