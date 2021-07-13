import ClassificationsRepository from "@modules/rural-property-management/infra/typeorm/repositories/ClassificationsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteClassificationService {
  constructor(
    @inject('ClassificationsRepository')
      private classificationsRepository: ClassificationsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.classificationsRepository.findByIdOrFail(id);
    await this.classificationsRepository.delete(id);
  }
}

export default DeleteClassificationService;