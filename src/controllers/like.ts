import { Resolver } from "../types/gql"
import { Like, User, LikeUser } from "../models"
import { UserInputError } from "apollo-server-errors"

export const likeUser: Resolver = async (_, { userId }, { user }) => {
	try {
		if (user!._id === userId) {
			throw new UserInputError("you cannot like yourself")
		}
		const [existUser, [likeValid]] = await Promise.all([
			User.findById(userId),
			Like.aggregate([
				{
					$match: { users: { $in: [user!._id] } },
				},
			]),
		])

		if (!existUser) {
			return new UserInputError("Incorrect user id")
		}

		if (likeValid?.users[0].equals(user!._id) || likeValid?.matched) {
			return new UserInputError("You had already liked this user")
		}

		const like = await Like.create({
			users: [user!._id, userId],
		})

		await LikeUser.create({
			like: like._id,
			source: user!._id,
			target: userId,
		})

		return like
	} catch (error) {
		throw new UserInputError(error.message)
	}
}

export const unLikeUser: Resolver = async (_, { userId }, { user }) => {
	try {
		const likeExist = await Like.findOneAndDelete({
			$and: [{ liker: { $eq: user!._id } }, { liking: userId }],
		})

		if (!likeExist) {
			throw new UserInputError("Incorrect user id")
		}
	} catch (error) {
		throw new UserInputError(error.message)
	}
}
