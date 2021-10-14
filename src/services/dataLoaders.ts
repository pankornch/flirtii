import DataLoader from "dataloader"
import { ILike, IMessage, IUser } from "../types/models"
import { User, Like, Message } from "../models"
import { Document } from "mongoose"

type DocumentType<T> = Document<any, any, T> &
	T & {
		_id: string | undefined
	}

export const userLoader = new DataLoader<string, DocumentType<IUser>>(
	async (keys) => {
		const users = await User.find({
			_id: {
				$in: keys as string[],
			},
		})
		const userMap: { [key: string]: DocumentType<IUser> } = {}

		users.forEach((user) => {
			userMap[user._id] = user
		})

		return keys.map((key) => userMap[key])
	}
)

export const likeLoader = new DataLoader<string, DocumentType<ILike>>(
	async (keys) => {
		const likes = await Like.find({
			liker: {
				$in: keys as string[],
			},
		})
		const likeMap: any = {}

		keys.forEach((key) => {
			likeMap[key] = likes.filter((e: any) => e?.liker?.equals(key))
		})

		return keys.map((key) => likeMap[key])
	}
)

export const messageLoaderByChatId = new DataLoader<
	string,
	DocumentType<IMessage>
>(async (keys) => {
	const messages = await Message.aggregate([
		{
			$match: {
				chat: {
					$in: keys,
				},
			},
		},
	])

	const messageMap: any = {}

	keys.forEach((key) => {
		messageMap[key] = messages.filter((e) => e.chat.equals(key))
	})

	return keys.map((key) => messageMap[key])
})