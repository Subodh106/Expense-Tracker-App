import bcrypt from "bcryptjs"

export const verifyPassword = async(Password:string,hashPassword:string)=>{
    try {
        const result = bcrypt.compare(Password,hashPassword)
        return result
    } catch (error:any) {
        console.log("Error during verifying password:",error.message)
    }
}