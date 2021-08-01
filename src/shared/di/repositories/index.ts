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

import IClientsRepository from '@modules/ceasa/repositories/IClientsRepository';
import ClientsRepository from '@modules/ceasa/infra/typeorm/repositories/ClientsRepository';

import ISalesRepository from '@modules/ceasa/repositories/ISalesRepository';
import SalesRepository from '@modules/ceasa/infra/typeorm/repositories/SalesRepository';

import ISaleItemsRepository from '@modules/ceasa/repositories/ISaleItemsRepository';
import SaleItemsRepository from '@modules/ceasa/infra/typeorm/repositories/SaleItemsRepository';

import IStockRepository from '@modules/ceasa/repositories/IStockRepository';
import StockRepository from '@modules/ceasa/infra/typeorm/repositories/StockRepository';

import IUsersRepository from '@modules/session/repositories/IUsersRepository';
import UsersRepository from '@modules/session/infra/typeorm/repositories/UsersRepository';

import IRefreshTokensRepository from '@modules/session/repositories/IRefreshTokensRepository';
import RefreshTokensRepository from '@modules/session/infra/typeorm/repositories/RefreshTokensRepository';

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
  );
  container.registerSingleton<IClientsRepository>(
    'ClientsRepository', ClientsRepository
  );
  container.registerSingleton<ISalesRepository>(
    'SalesRepository', SalesRepository
  );
  container.registerSingleton<ISaleItemsRepository>(
    'SaleItemsRepository', SaleItemsRepository
  );
  container.registerSingleton<IStockRepository>(
    'StockRepository', StockRepository
  );
  container.registerSingleton<IUsersRepository>(
    'UsersRepository', UsersRepository
  );
  container.registerSingleton<IRefreshTokensRepository>(
    'RefreshTokensRepository', RefreshTokensRepository
  );
}

export default repositoriesDI;