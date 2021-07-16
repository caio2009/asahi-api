import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

function ClientsRouter() {
  const controller = new ClientsController();
  const router = Router();

  router.get('/', controller.index.bind(controller));
  router.get('/:id', controller.show.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}

export default ClientsRouter;