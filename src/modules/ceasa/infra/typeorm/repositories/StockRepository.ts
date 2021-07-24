import IStockItemDTO from "@modules/ceasa/dtos/IStockItemDTO";
import IStockRepository from "@modules/ceasa/repositories/IStockRepository";
import { getConnection } from "typeorm";
import stockQueries from '@modules/ceasa/queries/stockQueries';
import IStockItemDetailsDTO from "@modules/ceasa/dtos/IStockItemDetailsDTO";
import AppError from "@shared/errors/AppError";

class StockRepository implements IStockRepository {
  async findAll(): Promise<IStockItemDTO[]> {
    const rows = await getConnection().manager.query(stockQueries.findAll);

    return rows.map((row: any) => {
      const stockItem = { ...row.stock_item };

      stockItem.cultivation.image = stockItem.cultivation.image
        ? `${process.env.API_URL}/uploads/${stockItem.cultivation.image}`
        : null;

      return stockItem as IStockItemDTO;
    })
  }

  async findStockItemDetails(data: {
    cultivationId: string,
    classificationId: string,
    unitId: string
  }): Promise<IStockItemDetailsDTO> {
    const { cultivationId, classificationId, unitId } = data;

    const rows = await getConnection().manager.query(stockQueries.findStockItemDetails, [cultivationId, classificationId, unitId]);
    const row = rows[0];

    if (!row) throw new AppError(404, 'Stock Item not found!');

    const stockItemDetails: IStockItemDetailsDTO = {
      inStock: row.in_stock,
      cultivation: row.cultivation,
      classification: row.classification,
      unit: row.unit,
      origins: row.origins
    };

    return stockItemDetails
  }
}

export default StockRepository;