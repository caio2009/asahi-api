import Sale from "../infra/typeorm/entities/Sale";

interface ISalesMappedByDateDTO {
  date: Date;
  sales: Sale[];
}

export default ISalesMappedByDateDTO;