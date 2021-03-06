import Cultivation from "@modules/rural-property-management/infra/typeorm/entities/Cultivation";

interface ICultivationsRepository {
  findAll(): Promise<Cultivation[]>;
  findById(id: string): Promise<Cultivation | undefined>;
  findByIdOrFail(id: string): Promise<Cultivation>;
  findByName(name: string): Promise<Cultivation | undefined>;
  save(data: Cultivation): Promise<Cultivation>;
  delete(id: string): Promise<void>;
}

export default ICultivationsRepository;