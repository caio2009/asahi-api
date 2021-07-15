import Classification from "@modules/rural-property-management/infra/typeorm/entities/Classification";
import ClassificationsRepository from "@modules/rural-property-management/infra/typeorm/repositories/ClassificationsRepository";
import validateClassification from "@modules/rural-property-management/validations/validateClassification";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface ICreateClassificationData {
  name: string;
}

@injectable()
class CreateClassificationService {
  constructor(
    @inject('ClassificationsRepository')
    private classificationsRepository: ClassificationsRepository
  ) { }

  async execute(data: ICreateClassificationData): Promise<Classification> {
    const finded = await this.classificationsRepository.findByName(data.name);
    if (finded) throw new AppError(409, 'Classification with this name already exists!');

    const obj = new Classification();
    obj.name = data.name;

    await validateClassification(obj);
    return await this.classificationsRepository.save(obj);
  }
}

export default CreateClassificationService;