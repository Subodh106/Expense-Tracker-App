"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SubmitHandler, useForm } from "react-hook-form"
import { loginSchema } from '@/schema/loginSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type loginFormValue = z.infer<typeof loginSchema>

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState("")
  const { register, handleSubmit, formState: { errors }, reset } = useForm<loginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const router = useRouter();
  const onsubmit: SubmitHandler<loginFormValue> = async (data) => {
    try {
      setLoading(true);
      setServerErrors("");
      const response = await axios.post("/api/user/log-in", data,)
      if (response.status === 200) {
        reset();
        toast.success("Login successfully")
        router.push("/dashboard");
      }
    } catch (error: any) {
      setServerErrors(error?.response?.data?.message || "Login failed")
    }
    finally {
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
              autoComplete='email'
              {...register("email")}
              required
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
              placeholder='Enter your password'
              autoComplete='current-password'
              {...register("password")}
              required
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          {serverErrors && <p className='text-sm text-red-500'>{serverErrors}</p>}
          <Button className='w-full cursor-pointer' type='submit' disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </CardContent>
      <CardContent>
        <Link href="/auth/sign-up">
          <Button variant="outline" className='w-full cursor-pointer'>Create an Account</Button>
        </Link>
      </CardContent>
    </Card>
  )
}


export default LoginPage