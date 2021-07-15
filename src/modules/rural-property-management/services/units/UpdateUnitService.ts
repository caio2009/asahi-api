import Unit from "@modules/rural-property-management/infra/typeorm/entities/Unit";
import IUnitsRepository from "@modules/rural-property-management/repositories/IUnitsRepository";
import validateUnit from "@modules/rural-property-management/validations/validateUnit";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IUpdateUnitData {
  id: string;
  name: string;
  abbreviation: string;
}

@injectable()
class UpdateUnitService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: IUnitsRepository
  ) { }

  async execute(data: IUpdateUnitData): Promise<Unit> {
    let finded = await this.unitsRepository.findByName(data.name);
    if(finded && finded.id !== data.id) throw new AppError(409, 'Unit with this name already exists!');
    
    finded = await this.unitsRepository.findByAbbreviation(data.abbreviation);
    if(finded && finded.id !== data.id) throw new AppError(409, 'Unit with this abbreviation already exists!');
    
    const obj = await this.unitsRepository.findByIdOrFail(data.id);
    obj.name = data.name;
    obj.abbreviation = data.abbreviation;

    await validateUnit(obj);
    return await this.unitsRepository.save(obj);
  }
}

export default UpdateUnitService;