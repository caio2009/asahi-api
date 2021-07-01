import { Router } from 'express';
import { container } from 'tsyringe';
import RuralPropertiesController from '../controllers/RuralPropertiesController';
import RuralPropertyFieldsController from '../controllers/RuralPropertyFieldsController';

function ruralPropertiesRouter() {
  const ruralPropertiesController = container.resolve(RuralPropertiesController);
  const ruralPropertyFieldsController = container.resolve(RuralPropertyFieldsController);
  const router = Router();

  router.get('/', ruralPropertiesController.index.bind(ruralPropertiesController));
  router.get('/:id', ruralPropertiesController.show.bind(ruralPropertiesController));
  router.get('/:id/fields', ruralPropertyFieldsController.index.bind(ruralPropertyFieldsController));
  router.post('/', ruralPropertiesController.create.bind(ruralPropertiesController));
  router.put('/:id', ruralPropertiesController.update.bind(ruralPropertiesController));
  router.delete('/:id', ruralPropertiesController.delete.bind(ruralPropertiesController));

  return router;
}

export default ruralPropertiesRouter;