export interface IResult {
  success: boolean;
  data: any;
  message: string;
}

type resultType = (message?: string, data?: any) => {
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

  static success: resultType = (message?: string, data?: any,) => {
    return new Result(true, data ?? {}, message ?? '');
  }

  static failure: resultType = (message?: string, data?: any,) => {
    return new Result(false, data ?? {}, message ?? '');
  }
}
