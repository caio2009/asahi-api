import IHarvestMappedByDateDTO from "@modules/rural-property-management/dtos/IHarvestMappedByDateDTO";
import Harvest from "@modules/rural-property-management/infra/typeorm/entities/Harvest";
import HarvestsRepository from "@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository";
import HarverstsRepository from "@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindHarvestByIdService {
  constructor(
    @inject('HarvestsRepository')
    private harvestsRepository: HarvestsRepository
  ) {}

  async execute(id: string): Promise<Harvest> {
    return await this.harvestsRepository.findByIdOrFail(id);
  }
}

export default FindHarvestByIdService;