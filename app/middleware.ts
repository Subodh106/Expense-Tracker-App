
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function middleware(req:NextRequest){
    const token = req.cookies.get("token")?.value
    if(!token){
        return NextResponse.json({message:"Unauthorized access"},{status:401})
    }
    return NextResponse.next()
}

export const config={
    matcher:['/api/group/*','/api/group/*','/api/get-data','/api/expenses/get-expenses']
}
