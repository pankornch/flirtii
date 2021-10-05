import { gql } from "apollo-server-express"

const types = gql`
	scalar Date

	type User {
		_id: String!
		username: String!
		avatar: String
		images: [String]!
		gender: String!
		bio: String
		about: String
		preferred: [String]!
		birthDate: Date!
		createdAt: Date!
		updatedAt: Date!
	}

	type AuthResponse {
		token: String!
		user: User!
	}
`

export default types