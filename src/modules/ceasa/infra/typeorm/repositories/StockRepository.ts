import IStockItemDTO from "@modules/ceasa/dtos/IStockItemDTO";
import IStockRepository from "@modules/ceasa/repositories/IStockRepository";
import { getConnection } from "typeorm";
import stockQueries from '@modules/ceasa/queries/stockQueries';

class StockRepository implements IStockRepository {
  async findAll(): Promise<IStockItemDTO[]> {
    const rows = await getConnection().manager.query(stockQueries.findAll);

    return rows.map((row: any) => {
      const stockItem = { ...row.stock_item };

      stockItem.cultivation.imageUrl = stockItem.cultivation.image
        ? `${process.env.API_URL}/uploads/${stockItem.cultivation.image}`
        : null;

      delete stockItem.cultivation.image;

      return stockItem as IStockItemDTO;
    })
  }
}

export default StockRepository;