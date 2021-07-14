import Client from '@modules/ceasa/infra/typeorm/entities/Client';
import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';

const schema = yup.object().shape({
  name: yup.string().required()
});

async function validateClient(cultivation: Client) {
  try {
    await schema.validate(cultivation, { abortEarly: false });
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateClient;