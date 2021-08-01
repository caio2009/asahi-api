import * as yup from 'yup';
import getValidationErrors from '@shared/utils/getValidationErrors';
import { AppValidationError } from '@shared/errors/AppValidationError';
import { ICreateUserData } from '../services/users/CreateUserService';
import { IUpdateUserData } from '../services/users/UpdateUserService';

const schemaForCreate = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required()
});

const schemaForUpdate = yup.object().shape({
  name: yup.string().required(),
  password: yup.string()
});

async function validateUser(user: ICreateUserData | IUpdateUserData, action: 'create' | 'update') {
  try {
    if (action === 'create') {
      await schemaForCreate.validate(user, { abortEarly: false });
      return;
    }

    if (action === 'update') {
      await schemaForUpdate.validate(user, { abortEarly: false });
    }
  } catch (err) {
    throw new AppValidationError(getValidationErrors(err));
  }
}

export default validateUser;