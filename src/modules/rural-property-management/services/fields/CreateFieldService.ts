import Field from '@modules/rural-property-management/infra/typeorm/entities/Field';
import IFieldsRepository from '@modules/rural-property-management/repositories/IFieldsRepository';
import IRuralPropertiesRepository from '@modules/rural-property-management/repositories/IRuralPropertiesRepository';
import { inject, injectable } from 'tsyringe';
import ICultivationsRepository from '../../repositories/ICultivationsRepository';

interface ICreateFieldService {
  name: string;
  ruralPropertyId: string;
  cultivationId: string;
}

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

  async execute(data: ICreateFieldService): Promise<Field> {
    const obj = new Field();
    
    obj.name = data.name;
    obj.ruralProperty = await this.ruralPropertiesRepository.findByIdOrFail(data.ruralPropertyId);
    obj.cultivation = await this.cultivationsRepository.findByIdOrFail(data.cultivationId);
    
    return await this.fieldsRepository.save(obj);
  }
}

export default CreateFieldService;