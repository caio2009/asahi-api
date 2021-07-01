import Harvest from "../infra/typeorm/entities/Harvest";

interface IHarvestMappedByDateDTO {
  date: string;
  harvests: Harvest[];
}

export default IHarvestMappedByDateDTO;