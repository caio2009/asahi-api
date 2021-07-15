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
    return await this.repository.find({
      order: { name: 'ASC' }
    });
  }

  async findById(id: string): Promise<RuralProperty | undefined> {
    return await this.repository.findOne(id);
  }

  async findByIdOrFail(id: string): Promise<RuralProperty> {
    const result = await this.repository.findOne(id);
    if (!result) throw new AppError(404, 'Rural Property not found!');
    return result;
  }

  async findByName(name: string): Promise<RuralProperty | undefined> {
    return await this.repository.findOne({ name });
  }

  async save(data: RuralProperty): Promise<RuralProperty> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default RuralPropertiesRepository;