import { Router } from 'express';
import { container } from 'tsyringe';
import SessionsController from '../controllers/SessionsController';

function SessionsRouter() {
  const controller = container.resolve(SessionsController);
  const router = Router();

  router.post('/', controller.create.bind(controller));
  router.post('/refresh', controller.update.bind(controller));
  router.delete('/', controller.delete.bind(controller));

  return router;
}

export default SessionsRouter;