import { Router } from 'express';
import StockController from '../controllers/StockController';

function StockRouter() {
  const controller = new StockController();
  const router = Router();

  router.get('/', controller.index.bind(controller));
  router.get('/details', controller.show.bind(controller));

  return router;
}

export default StockRouter;