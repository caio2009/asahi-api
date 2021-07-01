import IFieldsRepository from "@modules/rural-property-management/repositories/IFieldsRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, IsNull, Not, Repository } from "typeorm";
import Field from "../entities/Field";

class FieldsRepository implements IFieldsRepository {
  private repository: Repository<Field>;

  constructor() {
    this.repository = getRepository(Field);
  }

  async findAll(): Promise<Field[]> {
    return await this.repository.find({
      relations: ['ruralProperty', 'cultivation']
    });
  }

  async findOpened(): Promise<Field[]> {
    return await this.repository.find({
      where: { closedAt: IsNull() },
      relations: ['ruralProperty', 'cultivation']
    });
  }

  async findClosed(): Promise<Field[]> {
    return await this.repository.find({
      where: { closedAt: Not(IsNull()) },
      relations: ['ruralProperty', 'cultivation']
    });
  }

  async findById(id: string): Promise<Field | undefined> {
    try {
      return await this.repository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new AppError(400, 'Bad Request!');
    }
  }

  async findByIdOrFail(id: string): Promise<Field> {
    try {
      const result = await this.repository.findOne(id, {
        relations: ['ruralProperty', 'cultivation']
      });
      if (!result) throw new AppError(404, 'Field not found!');
      return result;
    } catch (err) {
      console.log(err);
      throw new AppError(400, 'Bad Request!');
    }
  }

  async findByRuralProperty(ruralPropertyId: string): Promise<Field[]> {
    return await this.repository.find({
      where: { ruralPropertyId },
      relations: ['ruralProperty', 'cultivation']
    });
  }

  async save(data: Field): Promise<Field> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default FieldsRepository;