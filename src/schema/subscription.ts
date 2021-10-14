import { gql } from "apollo-server-express"

const subscirption = gql`
	type Subscription {
		hello: String!
        test(authToken: String!): String

		chats(authToken: String!): [UserChat]!
	}
`

export default subscirption
