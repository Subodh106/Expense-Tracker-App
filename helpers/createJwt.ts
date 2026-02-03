import jwt from "jsonwebtoken";

const secret = "adfsafsfs";
if(!secret){
    throw new Error("Jwt secret is not defined")
}


export const createJWT = (id:string)=>{
    const token = jwt.sign(id,secret);
    return token
}