import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../configs/env"

export const createToken = (payload: any) => {
	return jwt.sign(payload, JWT_SECRET)
}

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET)
}
