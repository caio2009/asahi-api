import Harvest from "@modules/rural-property-management/infra/typeorm/entities/Harvest";
import HarvestsMappedByDateDTO from "@modules/rural-property-management/dtos/HarvestsMappedByDateDTO";

interface IHarvestsRepository {
  findAll(): Promise<Harvest[]>;
  findAllMappedByDate(): Promise<HarvestsMappedByDateDTO>;
  findWithStock(): Promise<Harvest[]>;
  findById(id: string): Promise<Harvest | undefined>;
  findByIdOrFail(id: string): Promise<Harvest>;
  save(data: Harvest): Promise<Harvest>;
  delete(id: string): Promise<void>;
}

export default IHarvestsRepository;