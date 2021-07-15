import Unit from '@modules/rural-property-management/infra/typeorm/entities/Unit';

interface IUnitsRepository {
  findAll(): Promise<Unit[]>;
  findById(id: string): Promise<Unit | undefined>;
  findByIdOrFail(id: string): Promise<Unit>;
  findByName(name: string): Promise<Unit | undefined>;
  findByAbbreviation(abbreviation: string): Promise<Unit | undefined>;
  save(data: Unit): Promise<Unit>;
  delete(id: string): Promise<void>;
}

export default IUnitsRepository;