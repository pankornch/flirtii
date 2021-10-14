import auth from "../middlewares/auth"
import { ResolverType } from "../types/gql"
import * as userController from "../controllers/user"
import * as chatController from "../controllers/chat"

const query: ResolverType = {
	hello: () => "Hello",
	me: auth(userController.me),
	users: auth(userController.getAllUsers),
	user: userController.getUserById,
	chats: auth(chatController.getChats),
	chat: auth(chatController.getChatById),
}

export default query
