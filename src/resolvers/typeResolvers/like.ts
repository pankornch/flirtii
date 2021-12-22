import { ResolverType } from "../../types/gql"

import DataLoader from "dataloader"
import { ILike } from "../../types/models"
import { userLoader } from "../../services/dataLoaders"

// const likeLoader = new DataLoader<string, any>(async (keys) => {
// 	const likes = await LikeUser.aggregate([
// 		{
// 			$match: {
// 				like: {
// 					$in: keys,
// 				},
// 			},
// 		},
// 	])

// 	return keys.map((key) => likes.filter((e) => e.like.equals(key)))
// })

const likeResolver: ResolverType<ILike> = {
	source(parent) {
		return userLoader.load(parent.source as string)
	},
	target(parent) {
		return userLoader.load(parent.target as string)
	},
}
export default likeResolver
