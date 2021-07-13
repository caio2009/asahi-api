import Classification from "@modules/rural-property-management/infra/typeorm/entities/Classification";
import ClassificationsRepository from "@modules/rural-property-management/infra/typeorm/repositories/ClassificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllClassificationsService {
  constructor(
    @inject('ClassificationsRepository')
    private classificationsRepository: ClassificationsRepository
  ) {}

  async execute(): Promise<Classification[]> {
    return await this.classificationsRepository.findAll();
  }
}

export default FindAllClassificationsService;