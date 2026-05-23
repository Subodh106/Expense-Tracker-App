import { NextResponse } from "next/server";

export class apiResponse extends NextResponse {
  constructor(
    status: number,
    message: string,
    data?: any,
  ) {
    super(
      JSON.stringify({
        success:true,
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
