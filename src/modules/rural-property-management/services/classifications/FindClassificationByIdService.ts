import Classification from "@modules/rural-property-management/infra/typeorm/entities/Classification";
import ClassificationsRepository from "@modules/rural-property-management/infra/typeorm/repositories/ClassificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindClassificationByIdService {
  constructor(
    @inject('ClassificationsRepository')
    private classificationsRepository: ClassificationsRepository
  ) {}

  async execute(id: string): Promise<Classification> {
    return await this.classificationsRepository.findByIdOrFail(id);
  }
}

export default FindClassificationByIdService;