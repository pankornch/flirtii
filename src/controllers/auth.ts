import { User } from "../models"
import { createToken } from "../services/jwt"
import { Resolver } from "../types/gql"
import { AuthenticationError, UserInputError } from "apollo-server-errors"
import bcrypt from "bcryptjs"

interface ISignUpInput {
	username: string
	password: string
	confirmPassword: string
}
interface ISignInInput {
	username: string
	password: string
}

export const signUp: Resolver = async (
	_,
	{ input }: { input: ISignUpInput }
) => {
	if (input.password !== input.confirmPassword) {
		throw new UserInputError("password not matched")
	}

	const data = {
		username: input.username,
		password: bcrypt.hashSync(input.password),
	}

	const user = await User.create(data)

	const token = createToken({ sub: user._id })

	return { user, token }
}

export const signIn: Resolver = async (
	_,
	{ input }: { input: ISignInInput }
) => {
	const user = await User.findOne({ username: input.username })

	if (!user) {
		return new AuthenticationError("Incorrect username or password")
	}

	if (!bcrypt.compareSync(input.password, user.password!)) {
		return new AuthenticationError("Incorrect username or password")
	}

	const token = createToken({ sub: user._id })
	return { user, token }
}
