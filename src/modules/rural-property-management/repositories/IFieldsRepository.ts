import Field from "@modules/rural-property-management/infra/typeorm/entities/Field";

interface IFieldsRepository {
  findAll(): Promise<Field[]>;
  findOpened(): Promise<Field[]>;
  findClosed(): Promise<Field[]>;
  findById(id: string): Promise<Field | undefined>;
  findByIdOrFail(id: string): Promise<Field>;
  findByRuralProperty(ruralPropertyId: string): Promise<Field[]>;
  save(data: Field): Promise<Field>;
  delete(id: string): Promise<void>;
}

export default IFieldsRepository;