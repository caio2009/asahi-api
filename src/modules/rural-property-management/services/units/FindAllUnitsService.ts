import Unit from "@modules/rural-property-management/infra/typeorm/entities/Unit";
import UnitsRepository from "@modules/rural-property-management/infra/typeorm/repositories/UnitsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllUnitsService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: UnitsRepository
  ) {}

  async execute(): Promise<Unit[]> {
    return await this.unitsRepository.findAll();
  }
}

export default FindAllUnitsService;