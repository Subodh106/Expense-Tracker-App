"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signupSchema } from "@/schema/signupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import axios from "axios"


type signupformValue = z.infer<typeof signupSchema>

const SignupPage = () => {
  const[loading , setLoading] = useState(false);
  const[serverErrors,setServerErrors] = useState("");
  const router = useRouter();
  const { handleSubmit, register, formState: { errors }, reset } = useForm<signupformValue>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: ""
    }
  })

  const onsubmit: SubmitHandler<signupformValue> = async (data) => {
    try {
      setLoading(true);
      setServerErrors("");
      const response = await axios.post("/api/user/sign-up",data);
      if(response.status===201){
        toast.success("Sign up successfully")
        router.push("/dashboard")
      }
    } catch (error:any) {
      setServerErrors(error?.response?.data?.message||"Signup failed")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>Create your Account?</CardTitle>
        <CardDescription>Create you account with email</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onsubmit)} id="signupform">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register("email")}
              autoComplete="email"
            />
            {
              errors.email && <p className="text-sm text-red-500">
                {errors.email?.message}
              </p>
            }
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="example"
              autoComplete="username"
              {...register("username")}
            />
            {
              errors.username && <p className="text-sm text-red-500">
                {errors.username?.message}
              </p>
            }
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register("password")}
            />
            {
              errors.password && <p className="text-sm text-red-500">
                {
                  errors.password.message
                }
              </p>
            }
          </div>
        </form>
      </CardContent>
      <CardContent className="flex flex-col gap-3">
        {
          serverErrors&& <p className="text-sm text-red-500">
            {serverErrors}
          </p>
        }
        <Button className="w-full cursor-pointer" type="submit" form="signupform" disabled={loading}>
          {loading ?"Signing up":"Sign up"}
        </Button>
      </CardContent>
      <CardContent>
        <Link href="/auth/log-in">
          <Button variant="outline" className="w-full cursor-pointer">
            Log In
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default SignupPage