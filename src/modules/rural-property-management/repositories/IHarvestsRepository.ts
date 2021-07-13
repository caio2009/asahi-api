import Harvest from "@modules/rural-property-management/infra/typeorm/entities/Harvest";
import IHarvestsMappedByDateDTO from "@modules/rural-property-management/dtos/IHarvestsMappedByDateDTO";

interface IHarvestsRepository {
  findAll(): Promise<Harvest[]>;
  findAllMappedByDate(): Promise<IHarvestsMappedByDateDTO[]>;
  findWithStock(): Promise<Harvest[]>;
  findById(id: string): Promise<Harvest | undefined>;
  findByIdOrFail(id: string): Promise<Harvest>;
  findByField(fieldId: string): Promise<IHarvestsMappedByDateDTO[]>;
  save(data: Harvest): Promise<Harvest>;
  delete(id: string): Promise<void>;
}

export default IHarvestsRepository;