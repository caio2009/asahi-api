import { Router } from 'express';
import { container } from 'tsyringe';
import ClosedFieldsController from '../controllers/ClosedFieldsController';
import FieldsController from '../controllers/FieldsController';
import FieldStatusController from '../controllers/FieldStatusController';
import OpenedFieldsController from '../controllers/OpenedFieldsController';
import FieldHarvestsController from '../controllers/FieldHarvestsController';

function fieldsRouter() {
  const fieldsController = container.resolve(FieldsController);
  const fieldStatusController = container.resolve(FieldStatusController);
  const openedFieldsController = container.resolve(OpenedFieldsController);
  const closedFieldsController = container.resolve(ClosedFieldsController);
  const fieldHarvestsController = container.resolve(FieldHarvestsController);
  const router = Router();

  router.get('/', fieldsController.index.bind(fieldsController));
  router.get('/opened', openedFieldsController.index.bind(openedFieldsController));
  router.get('/closed', closedFieldsController.index.bind(closedFieldsController));
  router.get('/:id', fieldsController.show.bind(fieldsController));
  router.get('/:id/harvests', fieldHarvestsController.index.bind(fieldHarvestsController));
  router.post('/', fieldsController.create.bind(fieldsController));
  router.put('/:id', fieldsController.update.bind(fieldsController));
  router.delete('/:id', fieldsController.delete.bind(fieldsController));
  router.patch('/:id/status', fieldStatusController.update.bind(fieldStatusController));

  return router;
}

export default fieldsRouter;