import { Router } from 'express';
import SalePagesController from '../controllers/SalePagesController';
import SalesController from '../controllers/SalesController';

function SalesRouter() {
  const salesController = new SalesController();
  const salePagesController = new SalePagesController();
  const router = Router();

  router.get('/', salesController.index.bind(salesController));
  router.get('/pages', salePagesController.index.bind(salePagesController));
  router.get('/:id', salesController.show.bind(salesController));
  router.post('/', salesController.create.bind(salesController));
  router.put('/:id', salesController.update.bind(salesController));
  router.delete('/:id', salesController.delete.bind(salesController));

  return router;
}

export default SalesRouter;