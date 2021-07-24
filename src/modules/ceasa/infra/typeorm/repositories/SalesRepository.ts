import ISalesMappedByDateDTO from "@modules/ceasa/dtos/ISalesMappedByDateDTO";
import saleQueries from "@modules/ceasa/queries/saleQueries";
import ISalesRepository from "@modules/ceasa/repositories/ISalesRepository";
import AppError from "@shared/errors/AppError";
import { getConnection, getRepository, Repository } from "typeorm";
import Sale from "../entities/Sale";

class SalesRepository implements ISalesRepository {
  private repository: Repository<Sale>;

  constructor() {
    this.repository = getRepository(Sale);
  }

  async findAll(): Promise<ISalesMappedByDateDTO[]> {
    const rows = await getConnection().manager.query(saleQueries.findAll);

    const sales: ISalesMappedByDateDTO[] = rows.map((row: any) => ({
      date: row.date,
      sales: row.sales
    } as ISalesMappedByDateDTO));

    return sales;
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

  async findPage(page: number, limit: number): Promise<Sale[]> {
    const sales = await this.repository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      // .leftJoinAndSelect('sale.saleItems', 'saleItem')
      // .leftJoinAndSelect('saleItem.harvest', 'harvest')
      // .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      // .leftJoinAndSelect('harvest.field', 'field')
      // .leftJoinAndSelect('harvest.cultivation', 'cultitivation')
      // .leftJoinAndSelect('harvest.classification', 'classification')
      // .leftJoinAndSelect('harvest.unit', 'unit')
      .orderBy('sale.number', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return sales;
  }

  async findByClientName(clientName: string, options: { page: number; limit: number; }): Promise<Sale[]> {
    const { page, limit } = options;

    const sales = await this.repository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      // .leftJoinAndSelect('sale.saleItems', 'saleItem')
      // .leftJoinAndSelect('saleItem.harvest', 'harvest')
      // .leftJoinAndSelect('harvest.ruralProperty', 'ruralProperty')
      // .leftJoinAndSelect('harvest.field', 'field')
      // .leftJoinAndSelect('harvest.cultivation', 'cultitivation')
      // .leftJoinAndSelect('harvest.classification', 'classification')
      // .leftJoinAndSelect('harvest.unit', 'unit')
      .where('sale.clientName like :clientName', { clientName: `%${clientName}%` })
      .orderBy('sale.number', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return sales;
  }

  async save(data: Sale): Promise<Sale> {
    return await this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default SalesRepository;