import { ResolverType } from "../../types/gql"

import DataLoader from "dataloader"
import { LikeUser } from "../../models"

const likeLoader = new DataLoader<string, any>(async (keys) => {
	const likes = await LikeUser.aggregate([
		{
			$match: {
				like: {
					$in: keys,
				},
			},
		},
	])

	return keys.map((key) => likes.filter((e) => e.like.equals(key)))
})

const likeResolver: ResolverType = {
	likeUsers: (parent) => {
		return likeLoader.load(parent._id)
	},
}

export default likeResolver
