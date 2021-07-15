import Cultivation from "@modules/rural-property-management/infra/typeorm/entities/Cultivation";
import ICultivationsRepository from "@modules/rural-property-management/repositories/ICultivationsRepository";
import validateCultivation from "@modules/rural-property-management/validations/validateCultivation";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

interface IUpdateCultivationData {
  id: string;
  name: string;
  imageFilename: string;
}

@injectable()
class UpdateCultivationService {
  constructor(
    @inject('CultivationsRepository')
    private cultivationsRepository: ICultivationsRepository
  ) { }

  async execute(data: IUpdateCultivationData): Promise<Cultivation> {
    const finded = await this.cultivationsRepository.findByName(data.name);
    if (finded && finded.id !== data.id) throw new AppError(409, 'Cultivation with this name already exists!');

    const obj = await this.cultivationsRepository.findById(data.id);
    obj.name = data.name;

    if (obj.image) {
      await fs.promises.unlink(path.resolve(uploadConfig.uploadsFolder, obj.image));
    }
    obj.image = data.imageFilename;

    await validateCultivation(obj);
    return await this.cultivationsRepository.save(obj);
  }
}

export default UpdateCultivationService;