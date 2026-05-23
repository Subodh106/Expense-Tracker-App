export class ApiError extends Error {
  status: number;
  headers: Record<string, string>;
  success: boolean = false;
  data?: any;

  constructor(
    success: boolean = false,
    status: number,
    message: string,
    data?: any,
  ) {
    super(
      JSON.stringify({
        success,
        message,
        data,
      }),
    );
    this.name = "ApiErrors"
    this.status = status;
    this.headers = {
      "Content-Type": "application/json",
    };
    this.success = success;
    this.data = data;
  }
}
