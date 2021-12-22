import { gql } from "apollo-server-express"

const types = gql`
	scalar Date
	scalar Upload

	type User {
		_id: String!
		email: String!
		firstName: String!
		lastName: String!
		nickname: String
		avatar: String
		images: [String]!
		gender: String!
		bio: String
		about: String
		preferred: [String]!
		birthDate: Date!
		createdAt: Date!
		updatedAt: Date!
		likes: [Like]!
		requestLikes: [Like]!
		chats: [Chat]!
	}

	type Like {
		_id: String!
		source: User!
		target: User!
		matched: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	type Chat {
		_id: String!
		messages: [Message]!
		lastMessage: Message
		users: [User]!
		friend: User
		createdAt: Date!
		updatedAt: Date!
	}

	type Message {
		_id: String!
		user: User!
		text: String!
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

	type Match {
		target: User!
		createdAt: Date!
	}

	enum LikeTypes {
		ALL
		LIKERS
		LIKES
	}
`

export default types
