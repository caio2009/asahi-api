import Unit from "@modules/rural-property-management/infra/typeorm/entities/Unit";
import UnitsRepository from "@modules/rural-property-management/infra/typeorm/repositories/UnitsRepository";
import validateUnit from "@modules/rural-property-management/validations/validateUnit";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface ICreateUnitData {
  name: string;
  abbreviation: string;
}

@injectable()
class CreateUnitService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: UnitsRepository
  ) { }

  async execute(data: ICreateUnitData): Promise<Unit> {
    let finded = await this.unitsRepository.findByName(data.name);
    if (finded) throw new AppError(409, 'Unit with this name already exists!');

    finded = await this.unitsRepository.findByAbbreviation(data.abbreviation);
    if(finded) throw new AppError(409, 'Unit with this abbreviation already exists!');

    const obj = new Unit();
    obj.name = data.name;
    obj.abbreviation = data.abbreviation;

    await validateUnit(obj);
    return await this.unitsRepository.save(obj);
  }
}

export default CreateUnitService;