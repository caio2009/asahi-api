import IClassificationsRepository from "@modules/rural-property-management/repositories/IClassificationsRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Classification from "../entities/Classification";

class ClassificationsRepository implements IClassificationsRepository {
  private repository: Repository<Classification>;

  constructor() {
    this.repository = getRepository(Classification);
  }

  async findAll(): Promise<Classification[]> {
    return await this.repository.find({
      order: { name: 'ASC' }
    });
  }

  async findById(id: string): Promise<Classification | undefined> {
    return await this.repository.findOne(id);
  }

  async findByIdOrFail(id: string): Promise<Classification> {
    const result = await this.repository.findOne(id);
    if (!result) throw new AppError(404, 'Classification not found!');
    return result;
  }

  async save(data: Classification): Promise<Classification> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ClassificationsRepository;