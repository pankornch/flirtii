import { gql } from "apollo-server-express"

const subscirption = gql`
	type Subscription {
		newMessage: Message!
		newRoomMessage(roomId: String): Message!
		matched: Match!
	}
`

export default subscirption
