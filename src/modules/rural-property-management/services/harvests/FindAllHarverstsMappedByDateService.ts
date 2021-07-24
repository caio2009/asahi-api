import IHarvestMappedByDateDTO from "@modules/rural-property-management/dtos/IHarvestsMappedByDateDTO";
import IHarvestsRepository from "@modules/rural-property-management/repositories/IHarvestsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllHarvestsMappedByDateService {
  constructor(
    @inject('HarvestsRepository')
    private harvestsRepository: IHarvestsRepository
  ) {}

  async execute(): Promise<IHarvestMappedByDateDTO[]> {
    return await this.harvestsRepository.findAllMappedByDate();
  }
}

export default FindAllHarvestsMappedByDateService;