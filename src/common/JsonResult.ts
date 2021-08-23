export default class JSONResult {
  private message: string;
  private data: Object;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
  
  get getMessage() {
    return this.data
  }

  get getData() {
    return this.message;
  }

  static ok(data?: any) {
    const jsonResult = new JSONResult('success', data ?? {})
    return jsonResult;
  }

  static authError(data?: any) {
    const jsonResult = new JSONResult('Auth Error', data ?? {})
    return jsonResult
  }

  static notFoundError(data?: any) {
    const jsonResult = new JSONResult('Not found Error', data ?? {})
    return jsonResult
  }

  static error(data?: any) {
    const jsonResult = new JSONResult('General Error', data ?? {})
    return jsonResult
  }
}