import { gql } from "apollo-server-express"

const mutation = gql`
	type Mutation {
		signIn(input: SignInInput!): AuthResponse!
		signUp(input: SignUpInput!): AuthResponse!

		upload(file: Upload!): String!

		getStart(input: GetStartInput!): User!
	
		like(userId: String!): Like!

		sendChat(input: SendChatInput!): Chat!
	}
`

export default mutation
