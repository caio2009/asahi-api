import Field from '@modules/rural-property-management/infra/typeorm/entities/Field';
import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import IRuralPropertiesRepository from '@modules/rural-property-management/repositories/IRuralPropertiesRepository';
import { inject, injectable } from 'tsyringe';
import ICultivationsRepository from '../../repositories/ICultivationsRepository';

@injectable()
class CreateFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository,

    @inject('RuralPropertiesRepository')
    private ruralPropertiesRepository: IRuralPropertiesRepository,

    @inject('CultivationsRepository')
    private cultivationsRepository: ICultivationsRepository
  ) { }

  async execute(field: Field): Promise<Field> {
    await this.ruralPropertiesRepository.findByIdOrFail(field.ruralPropertyId);
    await this.cultivationsRepository.findByIdOrFail(field.cultivationId);
    return await this.fieldsRepository.save(field);
  }
}

export default CreateFieldService;