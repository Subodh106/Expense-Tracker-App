import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"


const page = () => {
  return (
    <Card className="w-full max-w-full">
      <CardHeader>
          <CardTitle>Create your Account?</CardTitle>
          <CardDescription>Create you account with email</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text" 
              placeholder="example"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
            />
          </div>
        </form>
      </CardContent>
      <CardContent className="flex flex-col gap-3">
        <Button className="w-full cursor-pointer">
          Sign Up
        </Button>
        <Link href="/auth/log-in">
         <Button variant="outline" className="w-full cursor-pointer">
            Log In
        </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default page