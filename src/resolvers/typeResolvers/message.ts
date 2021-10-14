import { userLoader } from "../../services/dataLoaders"
// import { User } from "../../models"
import { ResolverType } from "../../types/gql"

const messageResolver: ResolverType = {
	user: (parent) => {
		return userLoader.load(parent.user)
	},
}

export default messageResolver
