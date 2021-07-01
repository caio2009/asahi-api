import Field from '@modules/rural-property-management/infra/typeorm/entities/Field';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  name: yup.string().required(),
  ruralPropertyId: yup.string().uuid().required(),
  cultivationId: yup.string().uuid().required()
})

async function validateField(field: Field) {
  try {
    await schema.validate(field, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateField;