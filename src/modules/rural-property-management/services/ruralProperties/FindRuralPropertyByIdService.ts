import RuralProperty from "@modules/rural-property-management/infra/typeorm/entities/RuralProperty";
import IRuralPropertiesRepository from "@modules/rural-property-management/repositories/IRuralPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindRuralPropertyByIdService {
  constructor(
    @inject('RuralPropertiesRepository')
    private ruralPropertyRepository: IRuralPropertiesRepository
  ) {}

  async execute(id: string): Promise<RuralProperty> {
    return await this.ruralPropertyRepository.findByIdOrFail(id);
  }
}

export default FindRuralPropertyByIdService;