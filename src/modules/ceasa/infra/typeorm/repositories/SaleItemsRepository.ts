import ISaleItemsRepository from "@modules/ceasa/repositories/ISaleItemsRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import SaleItem from "../entities/SaleItem";

class SaleItemsRepository implements ISaleItemsRepository {
  private repository: Repository<SaleItem>;

  constructor() {
    this.repository = getRepository(SaleItem);
  }

  async findAll(): Promise<SaleItem[]> {
    return await this.repository.createQueryBuilder('saleItem')
      .leftJoinAndSelect('saleItem.harvest', 'harvest')
      .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      .leftJoinAndSelect('harvest.field', 'field')
      .leftJoinAndSelect('harvest.cultivation', 'cultivation')
      .leftJoinAndSelect('harvest.classifition', 'classification')
      .leftJoinAndSelect('harvest.unit', 'unit')
      .getMany();
  }

  async findById(id: string): Promise<SaleItem> {
    return await this.repository.createQueryBuilder('saleItem')
      .leftJoinAndSelect('saleItem.harvest', 'harvest')
      .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      .leftJoinAndSelect('harvest.field', 'field')
      .leftJoinAndSelect('harvest.cultivation', 'cultivation')
      .leftJoinAndSelect('harvest.classifition', 'classification')
      .leftJoinAndSelect('harvest.unit', 'unit')
      .where('saleItem.id = :id', { id })
      .getOne();
  }

  async findByIdOrFail(id: string): Promise<SaleItem> {
    const result = await this.repository.createQueryBuilder('saleItem')
      .leftJoinAndSelect('saleItem.harvest', 'harvest')
      .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      .leftJoinAndSelect('harvest.field', 'field')
      .leftJoinAndSelect('harvest.cultivation', 'cultivation')
      .leftJoinAndSelect('harvest.classifition', 'classification')
      .leftJoinAndSelect('harvest.unit', 'unit')
      .where('saleItem.id = :id', { id })
      .getOne();
      
    if (!result) throw new AppError(404, 'Sale Item not found!');
    return result;
  }

  async save(data: SaleItem): Promise<SaleItem> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default SaleItemsRepository;