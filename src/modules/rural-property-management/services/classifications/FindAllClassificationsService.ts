import Classification from "@modules/rural-property-management/infra/typeorm/entities/Classification";
import IClassificationsRepository from "@modules/rural-property-management/repositories/IClassificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllClassificationsService {
  constructor(
    @inject('ClassificationsRepository')
    private classificationsRepository: IClassificationsRepository
  ) {}

  async execute(): Promise<Classification[]> {
    return await this.classificationsRepository.findAll();
  }
}

export default FindAllClassificationsService;