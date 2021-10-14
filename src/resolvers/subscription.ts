import { extractTokenMetadata } from "../services/jwt"
import { ResolverMap } from "../types/gql"

const subscription: ResolverMap = {
	hello: {
		subscribe: (_, __, { pubsub }) => {
			return pubsub.asyncIterator(["hello"])
		},
	},
	test: {
		subscribe: (_, __, { pubsub }) => {
			return pubsub.asyncIterator("x")
		},
	},
	chats: {
		subscribe: async (_, { authToken }, { pubsub }) => {
			const user = await extractTokenMetadata(authToken)
			return pubsub.asyncIterator(`${user!._id}:CHATS`)
		},
	},
}

export default subscription
