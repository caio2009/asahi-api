import RuralProperty from "@modules/rural-property-management/infra/typeorm/entities/RuralProperty";
import IRuralPropertiesRepository from "@modules/rural-property-management/repositories/IRuralPropertiesRepository";
import validateRuralProperty from "@modules/rural-property-management/validations/validateRuralProperty";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface ICreateRuralPropertyData {
  name: string;
  description: string;
}

@injectable()
class CreateRuralPropertyService {
  constructor(
    @inject('RuralPropertiesRepository')
    private ruralPropertiesRepository: IRuralPropertiesRepository
  ) {}

  async execute(data: ICreateRuralPropertyData): Promise<RuralProperty> {
    const finded = await this.ruralPropertiesRepository.findByName(data.name);
    if (finded) throw new AppError(409, 'Rural property with this name already exists!');

    const obj = new RuralProperty();
    obj.name = data.name;
    obj.description = data.description;

    await validateRuralProperty(obj);
    return await this.ruralPropertiesRepository.save(obj);
  }
}

export default CreateRuralPropertyService;