import Cultivation from "@modules/rural-property-management/infra/typeorm/entities/Cultivation";
import ICultivationsRepository from "@modules/rural-property-management/repositories/ICultivationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindCultivationByIdService {
  constructor(
    @inject('CultivationsRepository')
    private cultivationsRepository: ICultivationsRepository
  ) {}

  async execute(id: string): Promise<Cultivation> {
    const cultivation = await this.cultivationsRepository.findByIdOrFail(id);

    cultivation.image = cultivation.image ? `${process.env.API_URL}/uploads/${cultivation.image}` : null;

    return cultivation;
  }
}

export default FindCultivationByIdService;