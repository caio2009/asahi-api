import IHarvestMappedByDateDTO from "@modules/rural-property-management/dtos/IHarvestMappedByDateDTO";
import IHarvestsRepository from "@modules/rural-property-management/repositories/IHarvestsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllHarvestsService {
  constructor(
    @inject('HarverstsRepository')
    private harvestsRepository: IHarvestsRepository
  ) {}

  async execute(): Promise<IHarvestMappedByDateDTO[]> {
    return await this.harvestsRepository.findAllMappedByDate();
  }
}

export default FindAllHarvestsService;