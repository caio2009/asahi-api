import { Router } from 'express';
import ruralPropertiesRouter from '@modules/rural-property-management/infra/http/routes/ruralProperties.routes';
import cultivationsRouter from '@modules/rural-property-management/infra/http/routes/cultivations.routes';
import fieldsRouter from '@modules/rural-property-management/infra/http/routes/fields.routes';
import classificationsRouter from '@modules/rural-property-management/infra/http/routes/classificatoions.routes';
import unitsRouter from '@modules/rural-property-management/infra/http/routes/units.routes';
import harvestsRouter from '@modules/rural-property-management/infra/http/routes/harvests.routes';

function appRouter() {
  const router = Router();

  router.use('/rural-properties', ruralPropertiesRouter());
  router.use('/cultivations', cultivationsRouter());
  router.use('/fields', fieldsRouter());
  router.use('/classifications', classificationsRouter());
  router.use('/units', unitsRouter());
  router.use('/harvests', harvestsRouter());

  return router;
}

export default appRouter;