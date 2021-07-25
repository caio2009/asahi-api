import { Router } from 'express';
import SalePagesController from '../controllers/SalePagesController';
import SalesController from '../controllers/SalesController';
import SalesDeliveryStatusController from '../controllers/SalesDeliveryStatusController';
import SearchSalesController from '../controllers/SearchSalesController';
import WaitingSalesController from '../controllers/WaitingSalesController';

function SalesRouter() {
  const salesController = new SalesController();
  const salePagesController = new SalePagesController();
  const searchSalesController = new SearchSalesController();
  const waitingSalesController = new WaitingSalesController();
  const salesDeliveryStatusController = new SalesDeliveryStatusController();
  const router = Router();

  router.get('/', salesController.index.bind(salesController));
  router.get('/pages', salePagesController.index.bind(salePagesController));
  router.get('/search', searchSalesController.index.bind(searchSalesController));
  router.get('/waiting', waitingSalesController.index.bind(waitingSalesController));
  router.get('/:id', salesController.show.bind(salesController));
  router.post('/', salesController.create.bind(salesController));
  router.put('/:id', salesController.update.bind(salesController));
  router.delete('/:id', salesController.delete.bind(salesController));
  router.patch('/:id/delivery-status', salesDeliveryStatusController.update.bind(salesDeliveryStatusController));

  return router;
}

export default SalesRouter;