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

  static ok(data?: any, message?: string) {
    const jsonResult = new JSONResult(`Success: ${message}`, data ?? {}, true)
    return jsonResult;
  }

  static authError(data?: any, message?: string) {
    const jsonResult = new JSONResult(`Auth Error ${message}`, data ?? {}, false,)
    return jsonResult
  }

  static notFoundError(data?: any, message?: string) {
    const jsonResult = new JSONResult(`Not found Error ${message}`, data ?? {}, false)
    return jsonResult
  }

  static error(data?: any, message?: string) {
    const jsonResult = new JSONResult(`General Error ${message}`, data ?? {}, false)
    return jsonResult
  }
}