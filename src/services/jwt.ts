import jwt from "jsonwebtoken"
import { IUser } from "../types/models"
import { JWT_SECRET } from "../configs/env"
// import { userLoader } from "./dataLoaders"
import { User } from "../models"

const BadAuthenticationTokenErrorMessage = "Bad Authentication Token"

export const createToken = (payload: any) => {
	return jwt.sign(payload, JWT_SECRET)
}

export const verifyToken = (bearerToken: string) => {
	const splitToken = bearerToken.split(" ")

	if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
		throw new Error(BadAuthenticationTokenErrorMessage)
	}

	return splitToken[1]
}

export const extractTokenMetadata = async (
	bearerToken?: string
): Promise<IUser> => {
	if (!bearerToken) {
		throw new Error(BadAuthenticationTokenErrorMessage)
	}

	const token = verifyToken(bearerToken)

	const decoded: any = jwt.verify(token, JWT_SECRET!)
	// const user = await userLoader.load(decoded.sub)
	const user = await User.findById(decoded.sub)

	if (!user) {
		throw new Error(BadAuthenticationTokenErrorMessage)
	}

	return user.toJSON() as IUser
}
