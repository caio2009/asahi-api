class AppError {
  public readonly errorStatus: number;
  public readonly message: string;

  constructor(errorStatus: number, message: string) {
    this.errorStatus = errorStatus;
    this.message = message;
  }
}

export default AppError;