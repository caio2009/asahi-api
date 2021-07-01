import Classification from "@modules/rural-property-management/infra/typeorm/entities/Classification";

interface IClassificationsRepository {
  findAll(): Promise<Classification[]>;
  findById(id: string): Promise<Classification | undefined>;
  findByIdOrFail(id: string): Promise<Classification>;
  save(data: Classification): Promise<Classification>;
  delete(id: string): Promise<void>;
}

export default IClassificationsRepository;