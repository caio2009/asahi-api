import Field from "@modules/rural-property-management/infra/typeorm/entities/Field";
import FieldsRepository from "@modules/rural-property-management/infra/typeorm/repositories/FieldsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindFieldByIdService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: FieldsRepository
  ) {}

  async execute(id: string): Promise<Field> {
    return await this.fieldsRepository.findByIdOrFail(id);
  }
}

export default FindFieldByIdService;