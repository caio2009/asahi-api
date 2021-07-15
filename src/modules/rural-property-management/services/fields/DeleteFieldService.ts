import IFieldsRepository from "@modules/rural-property-management/repositories/IFieldsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteFieldService {
  constructor(
    @inject('FieldsRepository')
      private fieldsRepository: IFieldsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.fieldsRepository.findByIdOrFail(id);
    await this.fieldsRepository.delete(id);
  }
}

export default DeleteFieldService;