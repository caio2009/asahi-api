import IClassificationsRepository from '@modules/rural-property-management/repositories/IClassificationsRepository';
import IUnitsRepository from '@modules/rural-property-management/repositories/IUnitsRepository';
import IHarvestsRepository from '@modules/rural-property-management/repositories/IHarvestsRepository';
import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import Harvest from '@modules/rural-property-management/infra/typeorm/entities/Harvest';
import { inject, injectable } from 'tsyringe';

interface IUpdateHarvestData {
  id: string;
  date: Date;
  quantity: number;
  fieldId: string;
  classificationId: string;
  unitId: string;
}

@injectable()
class UpdateHarvestService {
  constructor(
    @inject('HarvestsRepository')
    private harvestsRepository: IHarvestsRepository,

    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository,

    @inject('ClassificationsRepository')
    private classificationsRepository: IClassificationsRepository,

    @inject('UnitsRepository')
    private unitsRepository: IUnitsRepository
  ) { }

  async execute(data: IUpdateHarvestData): Promise<Harvest> {
    const obj = await this.harvestsRepository.findByIdOrFail(data.id);

    obj.date = data.date || undefined;
    obj.quantity = data.quantity;
    obj.inStock = obj.inStock + (data.quantity - obj.quantity);

    const field = await this.fieldsRepository.findByIdOrFail(data.fieldId);

    obj.field = field;
    obj.ruralProperty = field.ruralProperty;
    obj.cultivation = field.cultivation;
    obj.classification = await this.classificationsRepository.findByIdOrFail(data.classificationId);
    obj.unit = await this.unitsRepository.findByIdOrFail(data.unitId);

    return await this.harvestsRepository.save(obj);
  }
}

export default UpdateHarvestService;