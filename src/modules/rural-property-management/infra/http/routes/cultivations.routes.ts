import { Router } from 'express';
import { container } from 'tsyringe';
import CultivationsController from '../controllers/CultivationsController';
import multer from 'multer';
import uploadConfig from '@config/upload';

function cultivationsRouter() {
  const controller = container.resolve(CultivationsController);
  const router = Router();

  const upload = multer(uploadConfig.multer);

  router.get('/', controller.index.bind(controller));
  router.get('/:id', controller.show.bind(controller));
  router.post('/', upload.single('image'), controller.create.bind(controller));
  router.put('/:id', upload.single('image'), controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}

export default cultivationsRouter;