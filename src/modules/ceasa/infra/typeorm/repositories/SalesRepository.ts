import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Sale from "../entities/Sale";

class SalesRepository implements ISalesRepository {
  private repository: Repository<Sale>;

  constructor() {
    this.repository = getRepository(Sale);
  }

  async findAll(): Promise<Sale[]> {
    return await this.repository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      .leftJoinAndSelect('sale.saleItems', 'saleItem')
      .leftJoinAndSelect('saleItem.harvest', 'harvest')
      .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      .leftJoinAndSelect('harvest.field', 'field')
      .leftJoinAndSelect('harvest.cultivation', 'cultivation')
      .leftJoinAndSelect('harvest.classification', 'classification')
      .leftJoinAndSelect('harvest.unit', 'unit')
      .getMany();
  }

  async findById(id: string): Promise<Sale> {
    return await this.repository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      .leftJoinAndSelect('sale.saleItems', 'saleItem')
      .leftJoinAndSelect('saleItem.harvest', 'harvest')
      .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      .leftJoinAndSelect('harvest.field', 'field')
      .leftJoinAndSelect('harvest.cultivation', 'cultivation')
      .leftJoinAndSelect('harvest.classification', 'classification')
      .leftJoinAndSelect('harvest.unit', 'unit')
      .where('sale.id = :id', { id })
      .getOne();
  }

  async findByIdOrFail(id: string): Promise<Sale> {
    const result = await this.repository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      .leftJoinAndSelect('sale.saleItems', 'saleItem')
      .leftJoinAndSelect('saleItem.harvest', 'harvest')
      .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      .leftJoinAndSelect('harvest.field', 'field')
      .leftJoinAndSelect('harvest.cultivation', 'cultivation')
      .leftJoinAndSelect('harvest.classification', 'classification')
      .leftJoinAndSelect('harvest.unit', 'unit')
      .where('sale.id = :id', { id })
      .getOne();
      
    if (!result) throw new AppError(404, 'Sale not found!');
    return result;
  }

  async save(data: Sale): Promise<Sale> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default SalesRepository;