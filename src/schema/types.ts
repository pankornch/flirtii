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
		users: [User]!
		matched: Boolean!
		likeUsers: [LikeUser]!
		createdAt: Date!
		updatedAt: Date!
	}

	type LikeUser {
		_id: String!
		source: User!
		target: User!
		createdAt: Date!
		updatedAt: Date!
	}

	type Chat {
		_id: String!
		messages: [Message]!
		message: Message
		users: [User]!
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

	type UserChat {
		recipient: User!
		chat: Chat
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
