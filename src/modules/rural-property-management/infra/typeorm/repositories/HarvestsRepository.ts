import IHarvestMappedByDateDTO from "@modules/rural-property-management/dtos/IHarvestMappedByDateDTO";
import IHarvestsRepository from "@modules/rural-property-management/repositories/IHarvestsRepository";
import AppError from "@shared/errors/AppError";
import { getConnection, getRepository, MoreThan, Repository } from "typeorm";
import Harvest from "../entities/Harvest";
import * as harvestsQueries from '@modules/rural-property-management/queries/harvestsQueries';

class HarvestsRepository implements IHarvestsRepository {
  private repository: Repository<Harvest>;

  constructor() {
    this.repository = getRepository(Harvest);
  }

  async findAll(): Promise<Harvest[]> {
    return await this.repository.find({
      relations: ['ruralProperty', 'field', 'cultivation', 'classification', 'unit'],
      order: { date: 'DESC' }
    });
  }

  async findAllMappedByDate(): Promise<IHarvestMappedByDateDTO[]> {
    const rows = await getConnection().manager.query(harvestsQueries.findAllMappedByDate);
    const aggregate: IHarvestMappedByDateDTO[] = [];
    rows.forEach((row: any) => {
      aggregate.push({ date: row.date, harvests: row.harvests });
    });
    return aggregate;
  }

  async findWithStock(): Promise<Harvest[]> {
    return await this.repository.find({
      where: { inStock: MoreThan(0) },
      relations: ['ruralProperty', 'field', 'cultivation', 'classification', 'unit'],
      order: { date: 'DESC' }
    });
  }

  async findById(id: string): Promise<Harvest | undefined> {
    try {
      return await this.repository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new AppError(400, 'Bad Request!');
    }
  }

  async findByIdOrFail(id: string): Promise<Harvest> {
    try {
      const result = await this.repository.findOne(id, {
        relations: ['ruralProperty', 'field', 'cultivation', 'classification', 'unit']
      });
      if (!result) throw new AppError(404, 'Harvest not found!');
      return result;
    } catch (err) {
      console.log(err);
      throw new AppError(400, 'Bad Request!');
    }
  }

  async save(data: Harvest): Promise<Harvest> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default HarvestsRepository;