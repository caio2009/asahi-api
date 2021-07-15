import { Router } from 'express';
import { container } from 'tsyringe';
import StockController from '../controllers/StockController';

function StockRouter() {
  const controller = container.resolve(StockController);
  const router = Router();

  router.get('/', controller.index.bind(controller));
  router.get('/details', controller.show.bind(controller));

  return router;
}

export default StockRouter;