import Classification from '@modules/rural-property-management/infra/typeorm/entities/Classification';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  name: yup.string().required()
})

async function validateClassification(cultivation: Classification) {
  try {
    await schema.validate(cultivation, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateClassification;