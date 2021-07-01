import { ValidationError } from 'yup';

import { Errors } from '@shared/errors/AppValidationError';

function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export default getValidationErrors;