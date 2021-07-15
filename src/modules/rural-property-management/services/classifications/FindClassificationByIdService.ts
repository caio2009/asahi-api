import Classification from "@modules/rural-property-management/infra/typeorm/entities/Classification";
import IClassificationsRepository from "@modules/rural-property-management/repositories/IClassificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindClassificationByIdService {
  constructor(
    @inject('ClassificationsRepository')
    private classificationsRepository: IClassificationsRepository
  ) {}

  async execute(id: string): Promise<Classification> {
    return await this.classificationsRepository.findByIdOrFail(id);
  }
}

export default FindClassificationByIdService;