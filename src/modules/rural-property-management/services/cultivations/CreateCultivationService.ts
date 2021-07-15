import Cultivation from "@modules/rural-property-management/infra/typeorm/entities/Cultivation";
import ICultivationsRepository from "@modules/rural-property-management/repositories/ICultivationsRepository";
import validateCultivation from "@modules/rural-property-management/validations/validateCultivation";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface ICreateCultivationData {
  name: string;
  imageFilename: string;
}

@injectable()
class CreateCultivationService {
  constructor(
    @inject('CultivationsRepository')
    private cultivationsRepository: ICultivationsRepository
  ) {}

  async execute(data: ICreateCultivationData): Promise<Cultivation> {
    const finded = await this.cultivationsRepository.findByName(data.name);
    if (finded) throw new AppError(409, 'Cultivation with this name already exists!');

    const obj = new Cultivation();
    obj.name = data.name;
    obj.image = data.imageFilename;

    await validateCultivation(obj);
    return await this.cultivationsRepository.save(obj);
  }
}

export default CreateCultivationService;