import { ResolverType } from "../types/gql"
import * as authController from "../controllers/auth"

const mutation: ResolverType = {
	sign_up: authController.signUp,
	sign_in: authController.signIn,
}

export default mutation
