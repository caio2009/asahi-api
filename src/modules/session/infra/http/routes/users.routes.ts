import { Router } from 'express';
import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';

function UsersRouter() {
  const controller = container.resolve(UsersController);
  const router = Router();

  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));

  return router;
}

export default UsersRouter;