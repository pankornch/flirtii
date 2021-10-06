import Query from "./query"
import Mutation from "./mutation"
import { GraphQLUpload } from "graphql-upload"

const resolvers = {
	Upload: GraphQLUpload,
	Query,
	Mutation,
}

export default resolvers
