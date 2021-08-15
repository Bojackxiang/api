export interface IResult {
  success: boolean;
  data: any;
  message: string;
}


export default class Result implements IResult {
  success: boolean;
  data: any;
  message: string;

  constructor(success: boolean, data: any, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  static success(message?: string, data?: any,) {
    return new Result(true, data ?? {}, message ?? '');
  }

  static failure(message?: string, data?: any,) {
    return new Result(false, data ?? {}, message ?? '');
  }
}
