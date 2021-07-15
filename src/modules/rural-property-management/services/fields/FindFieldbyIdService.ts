import Field from "@modules/rural-property-management/infra/typeorm/entities/Field";
import IFieldsRepository from "@modules/rural-property-management/repositories/IFieldsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindFieldByIdService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) {}

  async execute(id: string): Promise<Field> {
    return await this.fieldsRepository.findByIdOrFail(id);
  }
}

export default FindFieldByIdService;