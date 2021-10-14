import { User } from "../models"
import { createToken } from "../services/jwt"
import { Resolver } from "../types/gql"
import { AuthenticationError, UserInputError } from "apollo-server-errors"
import bcrypt from "bcryptjs"

interface ISignUpInput {
	email: string
	password: string
	confirmPassword: string
	firstName: string
	lastName: string
}
interface ISignInInput {
	email: string
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
		email: input.email,
		password: bcrypt.hashSync(input.password),
		firstName: input.firstName,
		lastName: input.lastName,
	}

	const user = await User.create(data)

	const token = createToken({ sub: user._id })

	return { user, token }
}

export const signIn: Resolver = async (
	_,
	{ input }: { input: ISignInInput },
) => {
	const user = await User.findOne({ email: input.email })

	if (!user) {
		return new AuthenticationError("Incorrect email or password")
	}

	if (!bcrypt.compareSync(input.password, user.password!)) {
		return new AuthenticationError("Incorrect email or password")
	}

	const token = createToken({ sub: user._id })
	return { user, token }
}
