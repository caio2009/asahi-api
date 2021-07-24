import { Router } from 'express';
import SalePagesController from '../controllers/SalePagesController';
import SalesController from '../controllers/SalesController';
import SearchSalesController from '../controllers/SearchSalesController';

function SalesRouter() {
  const salesController = new SalesController();
  const salePagesController = new SalePagesController();
  const searchSalesController = new SearchSalesController();
  const router = Router();

  router.get('/', salesController.index.bind(salesController));
  router.get('/pages', salePagesController.index.bind(salePagesController));
  router.get('/search', searchSalesController.index.bind(searchSalesController));
  router.get('/:id', salesController.show.bind(salesController));
  router.post('/', salesController.create.bind(salesController));
  router.put('/:id', salesController.update.bind(salesController));
  router.delete('/:id', salesController.delete.bind(salesController));

  return router;
}

export default SalesRouter;