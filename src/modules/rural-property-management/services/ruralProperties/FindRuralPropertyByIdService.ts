import RuralProperty from "@modules/rural-property-management/infra/typeorm/entities/RuralProperty";
import RuralPropertiesRepository from "@modules/rural-property-management/infra/typeorm/repositories/RuralPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindRuralPropertyByIdService {
  constructor(
    @inject('RuralPropertiesRepository')
    private ruralPropertyRepository: RuralPropertiesRepository
  ) {}

  async execute(id: string): Promise<RuralProperty> {
    return await this.ruralPropertyRepository.findByIdOrFail(id);
  }
}

export default FindRuralPropertyByIdService;