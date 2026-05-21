import { NextResponse } from "next/server";

export class apiResponse extends NextResponse {
  constructor(
    success: boolean= true,
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
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
