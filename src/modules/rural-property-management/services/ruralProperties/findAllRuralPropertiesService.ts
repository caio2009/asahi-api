import RuralProperty from "@modules/rural-property-management/infra/typeorm/entities/RuralProperty";
import RuralPropertiesRepository from "@modules/rural-property-management/infra/typeorm/repositories/RuralPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllRuralPropertiesService {
  constructor (
    @inject('RuralPropertiesRepository')
    private ruralPropertiesRepository: RuralPropertiesRepository
  ) {}

  async execute(): Promise<RuralProperty[]> {
    return await this.ruralPropertiesRepository.findAll();
  }  
}

export default FindAllRuralPropertiesService;