import { gql } from "apollo-server-express"

const types = gql`
	scalar Date
	scalar Upload
	
	type User {
		_id: String!
		username: String!
		firstName: String!
		lastName: String!
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

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
`

export default types
