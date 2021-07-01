import AppError from "./AppError";

type Errors = {
  [key: string]: string;
};

class AppValidationError extends AppError {
  public readonly errors: Errors;
  
  constructor(errors: Errors) {
    super(400, 'Validation error!');
    this.errors = errors;
  }
}

export {
  Errors,
  AppValidationError
};