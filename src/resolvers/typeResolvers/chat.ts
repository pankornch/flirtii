import { userLoader } from "../../services/dataLoaders"
import { Message } from "../../models"

import { ResolverType } from "../../types/gql"
import { IChat } from "../../types/models"
import DataLoader from "dataloader"
import { compareId } from "../../services/compareId"

const messageLoader = new DataLoader<string, any>(async (keys) => {
	const messages = await Message.aggregate([
		{
			$match: {
				chat: {
					$in: keys,
				},
			},
		},
		{
			$sort: {
				createdAt: -1,
			},
		},
	])

	return keys.map((key) => messages.filter((e) => e.chat.equals(key)))
})

const chatResolver: ResolverType<IChat> = {
	users: (parent) => {
		return userLoader.loadMany(parent.users as string[])
	},
	messages: (parent) => {
		return messageLoader.load(parent._id as string)
	},
	lastMessage: async (parent) => {
		const message = await Message.findOne({ chat: parent._id }).sort({
			createdAt: -1,
		})

		return message
	},
	friend: (parent, _, { user }) => {
		const friendId = (parent!.users as string[]).find(
			(e: string) => !compareId(e, user!._id as string)
		)

		return userLoader.load(friendId as string)
	},
}

export default chatResolver
