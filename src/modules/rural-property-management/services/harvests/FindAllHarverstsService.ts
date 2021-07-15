import IHarvestMappedByDateDTO from "@modules/rural-property-management/dtos/IHarvestMappedByDateDTO";
import HarvestsRepository from "@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllHarvestsService {
  constructor(
    @inject('HarverstsRepository')
    private harvestsRepository: HarvestsRepository
  ) {}

  async execute(): Promise<IHarvestMappedByDateDTO[]> {
    return await this.harvestsRepository.findAllMappedByDate();
  }
}

export default FindAllHarvestsService;