import IClassificationsRepository from "@modules/rural-property-management/repositories/IClassificationsRepository";
import { inject, injectable } from "tsyringe";
  
@injectable()
class DeleteClassificationService {
  constructor(
    @inject('ClassificationsRepository')
      private classificationsRepository: IClassificationsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.classificationsRepository.findByIdOrFail(id);
    await this.classificationsRepository.delete(id);
  }
}

export default DeleteClassificationService;