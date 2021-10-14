import { Like } from "../../models"
import { ResolverType } from "../../types/gql"

const userResolver: ResolverType = {
	likes: (parent) => {
		return Like.aggregate([
			{
				$match: {
					$and: [{ users: { $in: [parent!._id] } }, { matched: false }],
				},
			},
			{
				$addFields: {
					first: {
						$first: "$users",
					},
				},
			},
			{
				$match: {
					first: parent!._id,
				},
			},
		])
	},
	requestLikes: (parent) => {
		return Like.aggregate([
			{
				$match: {
					$and: [{ users: { $in: [parent!._id] } }, { matched: false }],
				},
			},
			{
				$addFields: {
					last: {
						$last: "$users",
					},
				},
			},
			{
				$match: {
					last: parent!._id,
				},
			},
		])
	},
}

export default userResolver
