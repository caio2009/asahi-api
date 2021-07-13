import IUnitsRepository from "@modules/rural-property-management/repositories/IUnitsRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Unit from "../entities/Unit";

class UnitsRepository implements IUnitsRepository {
  private repository: Repository<Unit>;

  constructor() {
    this.repository = getRepository(Unit);
  }

  async findAll(): Promise<Unit[]> {
    return await this.repository.find({
      order: { name: 'ASC' }
    });
  }

  async findById(id: string): Promise<Unit | undefined> {
    return await this.repository.findOne(id);
  }

  async findByIdOrFail(id: string): Promise<Unit> {
    const result = await this.repository.findOne(id);
    if (!result) throw new AppError(404, 'Unit not found!');
    return result;
  }

  async save(data: Unit): Promise<Unit> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UnitsRepository;