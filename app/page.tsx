import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';


const page = async() => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if(!token){
    redirect("/auth/log-in")
  }else{
    redirect("/dashboard")
  }
}

export default page