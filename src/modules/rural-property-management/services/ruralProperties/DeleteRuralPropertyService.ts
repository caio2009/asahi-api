import RuralPropertiesRepository from "@modules/rural-property-management/infra/typeorm/repositories/RuralPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteRuralPropertyService {
  constructor(
    @inject('RuralPropertiesRepository')
    private ruralPropertiesRepository: RuralPropertiesRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.ruralPropertiesRepository.findByIdOrFail(id);
    await this.ruralPropertiesRepository.delete(id);
  }
}

export default DeleteRuralPropertyService;