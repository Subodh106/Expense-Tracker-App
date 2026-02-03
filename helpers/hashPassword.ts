import bcrypt from "bcryptjs"

export const hashPassword = async(password:string):Promise<string>=>{
    try {
        const hash = await bcrypt.hash(password,10) 
        return hash
    } catch (error) {
        return "Something went worng"
    }
}
