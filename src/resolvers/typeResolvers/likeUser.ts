import DataLoader from "dataloader"
import { ILike } from "../../types/models"
import { ResolverType } from "../../types/gql"
import { User } from "../../models"

const batch = async (key: string, keys: any) => {
	const users = await User.aggregate([
		{
			$match: {
				[key]: {
					$in: keys,
				},
			},
		},
	])

	const userMap: any = {}

	users.forEach((user) => {
		userMap[user[key]] = user
	})

	return keys.map((key: string) => userMap[key])
}

const userLoader = new DataLoader<string, ILike>(async (keys) => {
	return await batch("_id", keys)
})

const likeUserResolver: ResolverType = {
	target: (parent) => {
		return userLoader.load(parent.target)
	},
	source: (parent) => {
		return userLoader.load(parent.source)
	},
}

export default likeUserResolver
