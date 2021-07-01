import { Router } from 'express';
import { container } from 'tsyringe';
import CultivationsController from '../controllers/CultivationsController';

function cultivationsRouter() {
  const controller = container.resolve(CultivationsController);
  const router = Router();

  router.get('/', controller.index.bind(controller));
  router.get('/:id', controller.show.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}

export default cultivationsRouter;