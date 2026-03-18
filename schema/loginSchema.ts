import * as z from "zod"
export const loginSchema = z.object({
    email:z.email(),
    password:z.string().min(2,"passwrod must be at least 2 character").max(12,"passwrod must not be greater than 12 characters")
})