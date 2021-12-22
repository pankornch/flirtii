import { UserInputError } from "apollo-server-errors"
import Message from "../models/Message"
import { Chat, User } from "../models"
import { Resolver } from "../types/gql"
import { IChat } from "types/models"

export const sendChat: Resolver = async (_, { input }, context) => {
	const { user } = context
	try {
		const existUser = await User.findById(input.recipient)

		if (!existUser) {
			throw new UserInputError("Incorrect recipient id")
		}

		const existChat = await Chat.findOne({
			$and: [
				{ users: { $in: user!._id } },
				{ users: { $in: input.recipient } },
			],
		})

		let chat: IChat

		if (!existChat) {
			const res = await Chat.create({
				users: [user!._id, input.recipient],
			})
			chat = res
		} else {
			chat = existChat
		}

		const message = await Message.create({
			chat: chat._id,
			user: user!._id,
			text: input.text,
		})


		context.pubsub.publish(`${input.recipient}:NEW_MESSAGE`, {
			newMessage: message,
		})

		return chat
	} catch (error) {
		throw new UserInputError(error.message)
	}
}

export const getChats: Resolver = async (_, __, { user }) => {
	const chats = await Chat.aggregate([
		{
			$match: {
				users: {
					$in: [user!._id],
				},
			},
		},
	])

	return chats
}

export const getChatById: Resolver = async (_, { input }, { user }) => {
	const chat = await Chat.findOne({
		$and: [{ users: { $in: [user!._id as string] } }, { _id: input.id }],
	})

	if (!chat) {
		throw new UserInputError("Incorrect recipient id")
	}

	return chat
}
