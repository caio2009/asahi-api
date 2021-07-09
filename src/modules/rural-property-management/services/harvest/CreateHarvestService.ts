import IClassificationsRepository from '@modules/rural-property-management/repositories/IClassificationsRepository';
import IUnitsRepository from '@modules/rural-property-management/repositories/IUnitsRepository';
import IHarvestsRepository from '@modules/rural-property-management/repositories/IHarvestsRepository';
import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import Harvest from '@modules/rural-property-management/infra/typeorm/entities/Harvest';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateHarvestService {
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

  async execute(data: Harvest): Promise<Harvest> {
    await this.classificationsRepository.findByIdOrFail(data.classificationId);
    await this.unitsRepository.findByIdOrFail(data.unitId);
    const field = await this.fieldsRepository.findByIdOrFail(data.fieldId);

    data.ruralPropertyId = field.ruralProperty.id;
    data.cultivationId = field.cultivation.id;
    data.inStock = data.quantity;

    return await this.harvestsRepository.save(data);
  }
}

export default CreateHarvestService;