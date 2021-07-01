import Cultivation from '@modules/rural-property-management/infra/typeorm/entities/Cultivation';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  name: yup.string().required(),
  imageUrl: yup.string().url()
})

async function validateCultivation(cultivation: Cultivation) {
  try {
    await schema.validate(cultivation, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateCultivation;