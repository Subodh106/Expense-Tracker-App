
import * as z from "zod"
export const signupSchema = z.object({
    username:z.string().min(2,"username must be at least 2 character").max(15,"username must be less han 15").regex(/[a-zA-Z0-9_]+$/,"Username must not contain sepecial characters"),
    email:z.email(),
    password:z.string().min(2,"passwrod must be at least 2 character").max(12,"passwrod must not be greater than 12 characters")
})