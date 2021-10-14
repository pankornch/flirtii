import { userLoader } from "../../services/dataLoaders"
import { Message } from "../../models"

import { ResolverType } from "../../types/gql"
import DataLoader from "dataloader"

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

const chatResolver: ResolverType = {
	users: (parent) => {
		return userLoader.loadMany(parent.users)
	},
	messages: (parent) => {
		return messageLoader.load(parent._id)
	},
	message: async (parent) => {
		const message = await Message.findOne({ chat: parent._id }).sort({
			createdAt: -1,
		})

		return message
	},
}

export default chatResolver
