import { ResolverType } from "../types/gql"
import auth from "../middlewares/auth"
import * as authController from "../controllers/auth"
import * as userController from "../controllers/user"
import * as likeController from "../controllers/like"
import * as chatController from "../controllers/chat" 

const mutation: ResolverType = {
	signUp: authController.signUp,
	signIn: authController.signIn,

	getStart: auth(userController.update),

	like: auth(likeController.likeUser),

	sendChat: auth(chatController.sendChat)
}

export default mutation
