import { gql } from "apollo-server-express"

const input = gql`
	input SignInInput {
		email: String!
		password: String!
	}

	input SignUpInput {
		email: String!
		password: String!
		confirmPassword: String!
		firstName: String!
		lastName: String!
	}

	input GetStartInput {
		nickname: String!
		avatar: String!
		birthDate: Date!
		gender: String!
		bio: String!
		preferred: [String!]!
	}

	input SendChatInput {
		recipient: String!
		text: String!
	}

	input GetChatInput {
		id: String!
	}
`

export default input
