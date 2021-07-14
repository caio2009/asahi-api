import { Router } from 'express';
import { container } from 'tsyringe';
import SalesController from '../controllers/SalesController';

function SalesRouter() {
  const controller = container.resolve(SalesController);
  const router = Router();

  router.get('/', controller.index.bind(controller));
  router.get('/:id', controller.show.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}

export default SalesRouter;