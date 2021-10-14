import { AuthenticationError } from "apollo-server-express"
import { extractTokenMetadata } from "../services/jwt"
import { Resolver, Context } from "../types/gql"

export default function auth(handler: Resolver) {
	return async (parent: any, args: any, context: Context, info: any) => {
		try {
			const user = await extractTokenMetadata(context.authorization)
			context.user = user
			return handler(parent, args, context, info)
		} catch (e) {
            throw new AuthenticationError(e.message)
        }
	}
}
