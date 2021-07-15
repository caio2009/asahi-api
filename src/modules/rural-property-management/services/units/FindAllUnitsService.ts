import Unit from "@modules/rural-property-management/infra/typeorm/entities/Unit";
import IUnitsRepository from "@modules/rural-property-management/repositories/IUnitsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllUnitsService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: IUnitsRepository
  ) {}

  async execute(): Promise<Unit[]> {
    return await this.unitsRepository.findAll();
  }
}

export default FindAllUnitsService;