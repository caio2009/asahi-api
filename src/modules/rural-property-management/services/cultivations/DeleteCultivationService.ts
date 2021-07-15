import Cultivation from "@modules/rural-property-management/infra/typeorm/entities/Cultivation";
import ICultivationsRepository from "@modules/rural-property-management/repositories/ICultivationsRepository";
import validateCultivation from "@modules/rural-property-management/validations/validateCultivation";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

@injectable()
class DeleteCultivationService {
  constructor(
    @inject('CultivationsRepository')
    private cultivationsRepository: ICultivationsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const obj = await this.cultivationsRepository.findById(id);

    if (obj.image) {
      await fs.promises.unlink(path.resolve(uploadConfig.uploadsFolder, obj.image));
    }

    await this.cultivationsRepository.delete(id);
  }
}

export default DeleteCultivationService;