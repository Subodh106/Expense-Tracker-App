"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { loginSchema } from '@/schema/loginSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'
import { FieldGroup , Field, FieldError, FieldLabel } from '@/components/ui/field'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


type loginFormValue = z.infer<typeof loginSchema>

const page = () => {
  const[loading , setLoading]=useState(false);
  const[serverErrors,setServerErrors] = useState("")
  const { register, handleSubmit, watch, control, formState: { errors },reset } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const Router = useRouter();
  const onsubmit:SubmitHandler<loginFormValue> = async(data:any) => {
      try{
        setLoading(true)
        const response = await axios.post("/api/user/log-in",data,{
          headers:{
            "Content-Type":"application/json"
          }
        })
        if(response.status===200){
          reset();
          console.log(response.data)
          Router.push("/dashboard");
        }
        
      
      }catch(error:any){
        setServerErrors(error.message)
      }
      finally{
        setLoading(false)
      }
  }
return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm underline">Forgot password?</Link>
            </div>
            <Input 
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button className='w-full' type='submit' disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </CardContent>
      <CardContent>
        <Link href="/auth/sign-up">
          <Button variant="outline" className='w-full'>Create an Account</Button>
        </Link>
      </CardContent>
    </Card>
  )
}


export default page