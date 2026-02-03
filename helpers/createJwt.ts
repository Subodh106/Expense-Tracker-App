import jwt from "jsonwebtoken";
import { getJwtSecret } from "./getJwtSecret";


export const createJWT = (id:string)=>{
    const token = jwt.sign(id,getJwtSecret());
    return token
}