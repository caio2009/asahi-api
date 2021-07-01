import { Router } from 'express';
import { container } from 'tsyringe';
import UnitsController from '../controllers/UnitsController';

function unitsRouter() {
  const controller = container.resolve(UnitsController);
  const router = Router();

  router.get('/', controller.index.bind(controller));
  router.get('/:id', controller.show.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}

export default unitsRouter;