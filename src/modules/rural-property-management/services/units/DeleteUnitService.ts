import IUnitsRepository from "@modules/rural-property-management/repositories/IUnitsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteUnitService {
  constructor(
    @inject('UnitsRepository')
      private unitsRepository: IUnitsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.unitsRepository.findByIdOrFail(id);
    await this.unitsRepository.delete(id);
  }
}

export default DeleteUnitService;