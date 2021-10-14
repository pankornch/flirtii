import { User } from "../models"
import { Resolver } from "../types/gql"

interface UpdateInput {
	nickname: string
	birthDate: Date
	gender: string
	bio: string
	preferred: string[]
	avatar: string
}

export const me: Resolver = async (_, __, { user }) => {
	return user!
}

export const update: Resolver = async (
	_,
	{ input }: { input: UpdateInput },
	{ user }
) => {
	try {
		await User.updateOne({ _id: user!._id }, { $set: input })
		return await User.findById(user!._id)
	} catch (error) {
		throw new Error(error.message)
	}
}

export const getAllUsers: Resolver = async (_, __, { user }) => {
	const users = await User.aggregate([
		{
			$match: {
				_id: {
					$ne: user!._id,
				},
			},
		},
		{
			$sample: {
				size: 10,
			},
		},
	])

	return users
}

export const getUserById: Resolver = async (_, { id }) => {
	return await User.findById(id)
}
