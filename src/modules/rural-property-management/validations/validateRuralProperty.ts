import RuralProperty from '@modules/rural-property-management/infra/typeorm/entities/RuralProperty';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string()
})

async function validateRuralProperty(ruralProperty: RuralProperty) {
  try {
    await schema.validate(ruralProperty, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateRuralProperty;