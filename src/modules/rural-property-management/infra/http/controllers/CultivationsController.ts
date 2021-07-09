import AppError from '@shared/errors/AppError';
import Cultivation from '@modules/rural-property-management/infra/typeorm/entities/Cultivation';
import { Request, Response } from "express";
import { inject, injectable } from 'tsyringe';
import ICultivationsRepository from '@modules/rural-property-management/repositories/ICultivationsRepository';
import validateCultivation from '@modules/rural-property-management/validations/validateCultivation';
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

@injectable()
class CultivationsController {
  constructor(
    @inject('CultivationsRepository')
    private repository: ICultivationsRepository
  ) { }

  async index(req: Request, res: Response) {
    const result = await this.repository.findAll();

    return res.json(result.map(cultivation => ({
      ...cultivation,
      image: cultivation.image ? `${process.env.API_URL}/uploads/${cultivation.image}` : null
    })));
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.repository.findByIdOrFail(id);
    result.image = result.image ? `${process.env.API_URL}/uploads/${result.image}` : null;

    return res.json(result);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const file = req.file;

    const cultivationAlreadyExists = await this.repository.findByName(name);
    if (cultivationAlreadyExists) throw new AppError(409, 'Cultivation with this name already exists!');

    const cultivation = new Cultivation();
    Object.assign(cultivation, {
      name,
      image: file ? file.filename : undefined
    });

    await validateCultivation(cultivation);
    const result = await this.repository.save(cultivation);

    res.location(`${process.env.API_URL}/cultivations/${result.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const cultivation = await this.repository.findByIdOrFail(id);

    const { name } = req.body;
    const file = req.file;

    const findedCultivation = await this.repository.findByName(name);
    if (findedCultivation && findedCultivation.id !== id) {
      throw new AppError(409, 'Cultivation with this name already exists!');
    }

    Object.assign(cultivation, { name });

    if (file) {
      if (cultivation.image) {
        await fs.promises.unlink(path.resolve(uploadConfig.uploadsFolder, cultivation.image));
      }
      cultivation.image = file.filename;
    }

    await this.repository.save(cultivation);

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const cultivation = await this.repository.findByIdOrFail(id);

    if (cultivation.image) {
      await fs.promises.unlink(path.resolve(uploadConfig.uploadsFolder, cultivation.image));
    }
    await this.repository.delete(id);

    return res.status(204).send();
  }
}

export default CultivationsController;