import IHarvestsRepository from "@modules/rural-property-management/repositories/IHarvestsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteHarvestService {
  constructor(
    @inject('HarvestsRepository')
      private harvestsRepository: IHarvestsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.harvestsRepository.findByIdOrFail(id);
    await this.harvestsRepository.delete(id);
  }
}

export default DeleteHarvestService;