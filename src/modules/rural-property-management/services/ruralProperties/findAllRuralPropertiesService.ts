import RuralProperty from "@modules/rural-property-management/infra/typeorm/entities/RuralProperty";
import IRuralPropertiesRepository from "@modules/rural-property-management/repositories/IRuralPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllRuralPropertiesService {
  constructor (
    @inject('RuralPropertiesRepository')
    private ruralPropertiesRepository: IRuralPropertiesRepository
  ) {}

  async execute(): Promise<RuralProperty[]> {
    return await this.ruralPropertiesRepository.findAll();
  }  
}

export default FindAllRuralPropertiesService;