import { ResolverType } from "../types/gql"
import * as authController from "../controllers/auth"
import { FileUpload } from "graphql-upload"
import { upload } from "../services/upload"

const mutation: ResolverType = {
	sign_up: authController.signUp,
	sign_in: authController.signIn,

	async upload(_, { file }: { file: Promise<FileUpload> }) {
		const { createReadStream, filename, mimetype } = await file
		const stream = createReadStream()
		const url = await upload({
			stream,
			filename,
			dirname: "images",
			metadata: {
				contentType: mimetype,
			},
		})
		return url
	},
}

export default mutation
