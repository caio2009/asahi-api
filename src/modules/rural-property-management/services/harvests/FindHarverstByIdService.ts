import Harvest from "@modules/rural-property-management/infra/typeorm/entities/Harvest";
import IHarvestsRepository from "@modules/rural-property-management/repositories/IHarvestsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindHarvestByIdService {
  constructor(
    @inject('HarvestsRepository')
    private harvestsRepository: IHarvestsRepository
  ) {}

  async execute(id: string): Promise<Harvest> {
    return await this.harvestsRepository.findByIdOrFail(id);
  }
}

export default FindHarvestByIdService;