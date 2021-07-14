import CreateSaleService from '@modules/ceasa/services/sales/CreateSaleService';
import DeleteSaleService from '@modules/ceasa/services/sales/DeleteSaleService';
import FindAllSalesService from '@modules/ceasa/services/sales/FindAllSalesService';
import FindSaleByIdService from '@modules/ceasa/services/sales/FindSaleByIdService';
import UpdateSaleService from '@modules/ceasa/services/sales/UpdateSaleService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SalesController {

  async index(req: Request, res: Response) {
    const findAll = container.resolve(FindAllSalesService);
    const sales = await findAll.execute();

    return res.json(sales);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const findById = container.resolve(FindSaleByIdService);
    const sale = await findById.execute(id);

    return res.json(sale);
  }

  async create(req: Request, res: Response) {
    const {
      date,
      totalValue,
      paymentStatus,
      deliveryStatus,
      clientName,
      clientId,
      saleItems
    } = req.body;

    const createSale = container.resolve(CreateSaleService);
    const sale = await createSale.execute({
      date,
      totalValue,
      paymentStatus,
      deliveryStatus,
      clientName,
      clientId,
      saleItems
    });

    res.location(`${process.env.API_URL}/sales/${sale.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      date,
      totalValue,
      paymentStatus,
      deliveryStatus,
      clientName,
      clientId,
      saleItems
    } = req.body;

    const updateSale = container.resolve(UpdateSaleService);
    await updateSale.execute({
      id,
      date,
      totalValue,
      paymentStatus,
      deliveryStatus,
      clientName,
      clientId,
      saleItems
    });

    return res.status(204).send();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteSale = container.resolve(DeleteSaleService);
    await deleteSale.execute(id);

    return res.status(204).send();
  }

}

export default SalesController;