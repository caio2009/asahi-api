import ICultivationsRepository from "@modules/rural-property-management/repositories/ICultivationsRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Cultivation from "../entities/Cultivation";

class CultivationsRepository implements ICultivationsRepository {
  private repository: Repository<Cultivation>;

  constructor() {
    this.repository = getRepository(Cultivation);
  }

  async findAll(): Promise<Cultivation[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Cultivation | undefined> {
    try {
      return await this.repository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new AppError(400, 'Bad Request!');
    }
  }

  async findByIdOrFail(id: string): Promise<Cultivation> {
    try {
      const result = await this.repository.findOne(id);
      if (!result) throw new AppError(404, 'Cultivation not found!');
      return result;
    } catch (err) {
      throw new AppError(400, 'Bad Request');
    }
  }

  async save(data: Cultivation): Promise<Cultivation> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default CultivationsRepository;