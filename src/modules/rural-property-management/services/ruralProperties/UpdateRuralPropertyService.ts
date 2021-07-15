import RuralProperty from "@modules/rural-property-management/infra/typeorm/entities/RuralProperty";
import RuralPropertiesRepository from "@modules/rural-property-management/infra/typeorm/repositories/RuralPropertiesRepository";
import validateRuralProperty from "@modules/rural-property-management/validations/validateRuralProperty";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IUpdateRuralPropertyData {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateRuralPropertyService {
  constructor(
    @inject('RuralPropertiesRepository')
    private ruralPropertyRepository: RuralPropertiesRepository
  ) {}

  async execute(data: IUpdateRuralPropertyData): Promise<RuralProperty> {
    const finded = await this.ruralPropertyRepository.findByName(data.name);
    if (finded && finded.id !== data.id) throw new AppError(409, 'Rural property with this name already exists!');
    
    const obj = await this.ruralPropertyRepository.findByIdOrFail(data.id);
    obj.name = data.name;
    obj.description = data.description;

    await validateRuralProperty(obj);
    return await this.ruralPropertyRepository.save(obj);
  }
}

export default UpdateRuralPropertyService;