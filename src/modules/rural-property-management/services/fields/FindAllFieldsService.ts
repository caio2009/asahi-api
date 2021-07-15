import Field from "@modules/rural-property-management/infra/typeorm/entities/Field";
import FieldsRepository from "@modules/rural-property-management/infra/typeorm/repositories/FieldsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllFieldsService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: FieldsRepository
  ) {}

  async execute(): Promise<Field[]> {
    return await this.fieldsRepository.findAll();
  }
}

export default FindAllFieldsService;