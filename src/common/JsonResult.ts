export default class JSONResult {
  private message: string;
  private data: Object;
  private success: boolean;

  constructor(message: string, data: any, success: boolean = true) {
    this.message = message;
    this.data = data;
    this.success = success;
  }
  
  get getMessage() {
    return this.data
  }

  get getData() {
    return this.message;
  }

  static ok(data?: any) {
    const jsonResult = new JSONResult('Success: ', data ?? {}, true)
    return jsonResult;
  }

  static authError(data?: any) {
    const jsonResult = new JSONResult('Auth Error: ', data ?? {}, false, )
    return jsonResult
  }

  static notFoundError(data?: any) {
    const jsonResult = new JSONResult('Not found Error:  ', data ?? {}, false)
    return jsonResult
  }

  static error(data?: any) {
    const jsonResult = new JSONResult('General Error: ', data ?? {}, false)
    return jsonResult
  }
}