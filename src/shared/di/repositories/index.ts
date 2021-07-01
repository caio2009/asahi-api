import { container } from 'tsyringe';

import IRuralPropertiesRepository from '@modules/rural-property-management/repositories/IRuralPropertiesRepository';
import RuralPropertiesRepository from '@modules/rural-property-management/infra/typeorm/repositories/RuralPropertiesRepository';

import ICultivationsRepository from '@modules/rural-property-management/repositories/ICultivationsRepository';
import CultivationsRepository from '@modules/rural-property-management/infra/typeorm/repositories/CultivationsRepository';

import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import FieldsRepository from '@modules/rural-property-management/infra/typeorm/repositories/FieldsRepository';

import IClassificationsRepository from '@modules/rural-property-management/repositories/IClassificationsRepository';
import ClassificationsRepository from '@modules/rural-property-management/infra/typeorm/repositories/ClassificationsRepository';

import IUnitsRepository from '@modules/rural-property-management/repositories/IUnitsRepository';
import UnitsRepository from '@modules/rural-property-management/infra/typeorm/repositories/UnitsRepository';

import IHarvestsRepository from '@modules/rural-property-management/repositories/IHarvestsRepository';
import HarvestsRepository from '@modules/rural-property-management/infra/typeorm/repositories/HarvestsRepository';

function repositoriesDI() {
  container.registerSingleton<IRuralPropertiesRepository>(
    'RuralPropertiesRepository', RuralPropertiesRepository
  );
  container.registerSingleton<ICultivationsRepository>(
    'CultivationsRepository', CultivationsRepository
  );
  container.registerSingleton<IFieldsRepository>(
    'FieldsRepository', FieldsRepository
  );
  container.registerSingleton<IClassificationsRepository>(
    'ClassificationsRepository', ClassificationsRepository
  );
  container.registerSingleton<IUnitsRepository>(
    'UnitsRepository', UnitsRepository
  );
  container.registerSingleton<IHarvestsRepository>(
    'HarvestsRepository', HarvestsRepository
  )
}

export default repositoriesDI;