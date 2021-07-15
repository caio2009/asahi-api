import Unit from "@modules/rural-property-management/infra/typeorm/entities/Unit";
import IUnitsRepository from "@modules/rural-property-management/repositories/IUnitsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindUnitByIdService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: IUnitsRepository
  ) {}

  async execute(id: string): Promise<Unit> {
    return await this.unitsRepository.findByIdOrFail(id);
  }
}

export default FindUnitByIdService;