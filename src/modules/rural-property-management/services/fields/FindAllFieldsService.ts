import Field from "@modules/rural-property-management/infra/typeorm/entities/Field";
import IFieldsRepository from "@modules/rural-property-management/repositories/IFieldsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllFieldsService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) {}

  async execute(): Promise<Field[]> {
    return await this.fieldsRepository.findAll();
  }
}

export default FindAllFieldsService;