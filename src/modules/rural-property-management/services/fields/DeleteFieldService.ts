import FieldsRepository from "@modules/rural-property-management/infra/typeorm/repositories/FieldsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteFieldService {
  constructor(
    @inject('FieldsRepository')
      private fieldsRepository: FieldsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.fieldsRepository.findByIdOrFail(id);
    await this.fieldsRepository.delete(id);
  }
}

export default DeleteFieldService;