class Response {
  data: any;
  message: string;
  code: number;;
  success: boolean;

  constructor(message: string,
    data: any, // data 最好不要是 string
    code: number,
    success: boolean = true) {
    this.data = data;
    this.message = message;
    this.code = code;
    this.success = success;
  }

  static buildResponse(message?: string,
    data?: any,
    code: number = 200, 
    success: boolean = true) {
    return new Response(message ?? '', data, code, success);
  }
}


export default Response;