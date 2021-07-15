import IRuralPropertiesRepository from "@modules/rural-property-management/repositories/IRuralPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteRuralPropertyService {
  constructor(
    @inject('RuralPropertiesRepository')
    private ruralPropertiesRepository: IRuralPropertiesRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.ruralPropertiesRepository.findByIdOrFail(id);
    await this.ruralPropertiesRepository.delete(id);
  }
}

export default DeleteRuralPropertyService;