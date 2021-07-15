import HarvestsRepository from "@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteHarvestService {
  constructor(
    @inject('HarvestsRepository')
      private harvestsRepository: HarvestsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.harvestsRepository.findByIdOrFail(id);
    await this.harvestsRepository.delete(id);
  }
}

export default DeleteHarvestService;