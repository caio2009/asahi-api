import Harvest from "../infra/typeorm/entities/Harvest";

interface IHarvestsMappedByDateDTO {
  date: Date;
  harvests: Harvest[];
}

export default IHarvestsMappedByDateDTO;