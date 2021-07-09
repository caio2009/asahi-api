import Unit from '@modules/rural-property-management/infra/typeorm/entities/Unit';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  name: yup.string().required(),
  abbreviation: yup.string().required()
});

async function validateUnit(cultivation: Unit) {
  try {
    await schema.validate(cultivation, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateUnit;