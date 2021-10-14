import Query from "./query"
import Mutation from "./mutation"
import Subscription from "./subscription"
import { GraphQLUpload } from "graphql-upload"
import {
	chatResolver,
	userResolver,
	messageResolver,
	likeResolver,
	likeUserResolver,
} from "./typeResolvers"

const resolvers = {
	Upload: GraphQLUpload,
	Query,
	Mutation,
	Subscription,

	User: userResolver,
	Like: likeResolver,
	Chat: chatResolver,
	Message: messageResolver,
	LikeUser: likeUserResolver,
}

export default resolvers
