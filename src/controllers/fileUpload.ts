import { FileUpload } from "graphql-upload"
import { upload } from "services/upload"
import { Resolver } from "../types/gql"

export const uploadUserAvatar: Resolver = async (
	_,
	{ file }: { file: Promise<FileUpload> }
) => {
	const { filename, mimetype, createReadStream } = await file

	const url = await upload({
		stream: createReadStream(),
		filename,
		dirname: "avatars",
		metadata: {
			contentType: mimetype,
		},
	})

	return url
}
