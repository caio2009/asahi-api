import Cultivation from "@modules/rural-property-management/infra/typeorm/entities/Cultivation";
import ICultivationsRepository from "@modules/rural-property-management/repositories/ICultivationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllCultivationsService {
  constructor(
    @inject('CultivationsRepository')
    private cultivationsRepository: ICultivationsRepository
  ) {}

  async execute(): Promise<Cultivation[]> {
    const cultivations = await this.cultivationsRepository.findAll();

    return cultivations.map((cultivation) => ({
      ...cultivation,
      image: cultivation.image ? `${process.env.API_URL}/uploads/${cultivation.image}` : null
    }));
  }
}

export default FindAllCultivationsService;