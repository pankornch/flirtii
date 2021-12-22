import { Resolver } from "../types/gql"
import { Like, User } from "../models"
import { UserInputError } from "apollo-server-errors"
import { compareId } from "../services/compareId"
import { pubsubNsp } from "../services/pubsubNsp"

const isMatch = async (user1: any, user2: any) => {
	const valid = await Promise.all([
		Like.findOne({
			$and: [{ source: user1 }, { target: user2 }],
		}),
		Like.findOne({
			$and: [{ source: user2 }, { target: user1 }],
		}),
	])

	return valid.every((b) => b != null)
}

export const likeUser: Resolver = async (_, { userId }, { user, pubsub }) => {
	try {
		if (compareId(user!._id, userId)) {
			throw new UserInputError("you cannot like yourself")
		}

		const [existUser, isLike] = await Promise.all([
			User.findById(userId),
			Like.findOne({
				$and: [{ soruce: user!._id as string }, { target: userId }],
			}),
		])

		if (!existUser) {
			return new UserInputError("Incorrect user id")
		}

		if (isLike) {
			return new UserInputError("You had already liked this user")
		}

		const like = await Like.create({
			source: user!._id,
			target: userId,
		})

		if (await isMatch(userId, user!._id)) {
			pubsubNsp({ pubsub, userIds: [user!._id], room: "matched" }).publish({
				target: await User.findById(userId).lean(),
			})
			pubsubNsp({ pubsub, userIds: [userId], room: "matched" }).publish({
				target: user,
			})

			like.matched = true
			await Promise.all([
				like.save(),
				Like.updateOne(
					{
						$and: [{ source: userId }, { target: user!._id }],
					},
					{
						$set: { matched: true },
					}
				),
			])
		}

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

export const getUserLikes: Resolver = async (_, input, context) => {
	switch (input.type) {
		case "ALL":
			return allLikes(null, input, context, null)
		case "LIKES":
			return likes(null, input, context, null)
		case "LIKERS":
			return getLikers(null, input, context, null)
	}
}

export const likes: Resolver = async (_, __, { user }) => {
	const likes = await Like.find({
		source: user!._id,
	})

	return likes
}

export const getLikers: Resolver = async (_, __, { user }) => {
	const likes = await Like.find({
		target: user!._id,
	})

	return likes
}

export const allLikes: Resolver = async (_, __, { user }) => {
	const likes = await Like.find({
		$or: [{ target: user!._id }, { source: user!._id }],
	}).lean()



	return likes
}
