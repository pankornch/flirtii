import { pubsubNsp } from "../services/pubsubNsp"
import { extractTokenMetadata } from "../services/jwt"
import { ResolverMap } from "../types/gql"

const subscription: ResolverMap = {
	newMessage: {
		subscribe: async (_, __, { pubsub, authorization }) => {
			const user = await extractTokenMetadata(authorization)
			return pubsub.asyncIterator(`${user!._id}:NEW_MESSAGE`)
		},
	},
	matched: {
		subscribe: async (_, __, { pubsub, authorization }) => {
			const user = await extractTokenMetadata(authorization)
			return pubsubNsp({pubsub, userIds: [user!._id], room: "matched"}).asyncIterator()
		},
	},
}

export default subscription
