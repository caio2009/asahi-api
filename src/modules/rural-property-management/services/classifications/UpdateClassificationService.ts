import Classification from "@modules/rural-property-management/infra/typeorm/entities/Classification";
import ClassificationsRepository from "@modules/rural-property-management/infra/typeorm/repositories/ClassificationsRepository";
import validateClassification from "@modules/rural-property-management/validations/validateClassification";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IUpdateClassificationData {
  id: string;
  name: string;
}

@injectable()
class UpdateClassificationService {
  constructor(
    @inject('ClassificationsRepository')
    private classificationsRepository: ClassificationsRepository
  ) { }

  async execute(data: IUpdateClassificationData): Promise<Classification> {
    const { id, name } = data;

    await this.classificationsRepository.findByIdOrFail(id);

    const finded = await this.classificationsRepository.findByName(name);
    if(finded && finded.id !== id) throw new AppError(409, 'Classification with this name already exists!');

    await validateClassification(data);
    return await this.classificationsRepository.save(data);
  }
}

export default UpdateClassificationService;