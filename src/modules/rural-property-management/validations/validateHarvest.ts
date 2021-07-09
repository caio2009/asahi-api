import Harvest from '@modules/rural-property-management/infra/typeorm/entities/Harvest';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  date: yup.date(),
  quantity: yup.number().required(),
  fieldId: yup.string().uuid().required(),
  classificationId: yup.string().uuid().required(),
  unitId: yup.string().uuid().required()
});

async function validateHarvest(harvest: Harvest) {
  try {
    await schema.validate(harvest, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateHarvest;