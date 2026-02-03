import { getJwtSecret } from "./getJwtSecret";
import jwt from "jsonwebtoken"

export function decodeJwt(token:string) {
  const decoded = jwt.verify(token, getJwtSecret());
  return decoded;
}
