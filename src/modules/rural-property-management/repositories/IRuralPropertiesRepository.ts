import RuralProperty from '@modules/rural-property-management/infra/typeorm/entities/RuralProperty';

interface IRuralPropertiesRepository {
  findAll(): Promise<RuralProperty[]>;
  findById(id: string): Promise<RuralProperty | undefined>;
  findByIdOrFail(id: string): Promise<RuralProperty>;
  findByName(name: string): Promise<RuralProperty | undefined>;
  save(data: RuralProperty): Promise<RuralProperty>;
  delete(id: string): Promise<void>;
}

export default IRuralPropertiesRepository;