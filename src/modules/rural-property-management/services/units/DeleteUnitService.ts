import UnitsRepository from "@modules/rural-property-management/infra/typeorm/repositories/UnitsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteUnitService {
  constructor(
    @inject('UnitsRepository')
      private unitsRepository: UnitsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.unitsRepository.findByIdOrFail(id);
    await this.unitsRepository.delete(id);
  }
}

export default DeleteUnitService;