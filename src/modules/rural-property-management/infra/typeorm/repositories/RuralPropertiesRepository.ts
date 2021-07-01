import IRuralPropertiesRepository from "@modules/rural-property-management/repositories/IRuralPropertiesRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import RuralProperty from "../entities/RuralProperty";

class RuralPropertiesRepository implements IRuralPropertiesRepository {
  private repository: Repository<RuralProperty>;

  constructor() {
    this.repository = getRepository(RuralProperty);
  }

  async findAll(): Promise<RuralProperty[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<RuralProperty | undefined> {
    try {
      return await this.repository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new AppError(400, 'Bad Request!');
    }
  }

  async findByIdOrFail(id: string): Promise<RuralProperty> {
    try {
      const result = await this.repository.findOne(id);
      if (!result) throw new AppError(404, 'Rural Property not found!');
      return result;
    } catch (err) {
      throw new AppError(400, 'Bad Request');
    }
  }

  async save(data: RuralProperty): Promise<RuralProperty> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default RuralPropertiesRepository;