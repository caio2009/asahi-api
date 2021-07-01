import { Router } from 'express';
import { container } from 'tsyringe';
import HarvestsController from '../controllers/HarvestsController';
import HarvestsWithStockController from '../controllers/HarvestsWithStockController';

function harvestsRouter() {
  const harvestsController = container.resolve(HarvestsController);
  const harvestsWithStockController = container.resolve(HarvestsWithStockController);
  const router = Router();

  router.get('/', harvestsController.index.bind(harvestsController));
  router.get('/with-stock', harvestsWithStockController.index.bind(harvestsWithStockController));
  router.get('/:id', harvestsController.show.bind(harvestsController));
  router.post('/', harvestsController.create.bind(harvestsController));
  router.put('/:id', harvestsController.update.bind(harvestsController));
  router.delete('/:id', harvestsController.delete.bind(harvestsController));

  return router;
}

export default harvestsRouter;