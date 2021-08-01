import { Router } from 'express';
import ruralPropertiesRouter from '@modules/rural-property-management/infra/http/routes/ruralProperties.routes';
import cultivationsRouter from '@modules/rural-property-management/infra/http/routes/cultivations.routes';
import fieldsRouter from '@modules/rural-property-management/infra/http/routes/fields.routes';
import classificationsRouter from '@modules/rural-property-management/infra/http/routes/classificatoions.routes';
import unitsRouter from '@modules/rural-property-management/infra/http/routes/units.routes';
import harvestsRouter from '@modules/rural-property-management/infra/http/routes/harvests.routes';
import clientsRouter from '@modules/ceasa/infra/http/routes/clients.routes';
import salesRouter from '@modules/ceasa/infra/http/routes/sales.routes';
import stockRouter from '@modules/ceasa/infra/http/routes/stock.routes';
import usersRouter from '@modules/session/infra/http/routes/users.routes';
import sessionsRouter from '@modules/session/infra/http/routes/sessions.routes';
import checkAuthentication from '../middlewares/checkAuthentication';

function appRouter() {
  const router = Router();

  router.use('/rural-properties', checkAuthentication, ruralPropertiesRouter());
  router.use('/cultivations', checkAuthentication, cultivationsRouter());
  router.use('/fields', checkAuthentication, fieldsRouter());
  router.use('/classifications', checkAuthentication, classificationsRouter());
  router.use('/units', checkAuthentication, unitsRouter());
  router.use('/harvests', checkAuthentication, harvestsRouter());
  router.use('/clients', checkAuthentication, clientsRouter());
  router.use('/sales', checkAuthentication, salesRouter());
  router.use('/stock', checkAuthentication, stockRouter());
  router.use('/users', checkAuthentication, usersRouter());
  router.use('/sessions', sessionsRouter());

  return router;
}

export default appRouter;