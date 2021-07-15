import Unit from "@modules/rural-property-management/infra/typeorm/entities/Unit";
import UnitsRepository from "@modules/rural-property-management/infra/typeorm/repositories/UnitsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindUnitByIdService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: UnitsRepository
  ) {}

  async execute(id: string): Promise<Unit> {
    return await this.unitsRepository.findByIdOrFail(id);
  }
}

export default FindUnitByIdService;