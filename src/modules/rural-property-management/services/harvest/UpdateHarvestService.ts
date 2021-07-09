import IClassificationsRepository from '@modules/rural-property-management/repositories/IClassificationsRepository';
import IUnitsRepository from '@modules/rural-property-management/repositories/IUnitsRepository';
import IHarvestsRepository from '@modules/rural-property-management/repositories/IHarvestsRepository';
import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import Harvest from '@modules/rural-property-management/infra/typeorm/entities/Harvest';
import { inject, injectable } from 'tsyringe';

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

  async execute(before: Harvest, data: Partial<Harvest>): Promise<Harvest> {
    const { date, quantity, fieldId, classificationId, unitId } = data;

    await this.classificationsRepository.findByIdOrFail(classificationId);
    await this.unitsRepository.findByIdOrFail(unitId);
    const field = await this.fieldsRepository.findByIdOrFail(fieldId);

    const { ruralPropertyId, cultivationId } = field;

    Object.assign(before, {
      date,
      quantity,
      inStock: before.inStock + (data.quantity - before.quantity),
      ruralPropertyId,
      fieldId,
      cultivationId,
      classificationId,
      unitId
    } as Harvest);

    return await this.harvestsRepository.save(before);
  }
}

export default UpdateHarvestService;