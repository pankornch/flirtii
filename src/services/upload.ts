import { getDownloadURL, ref, uploadBytes } from "@firebase/storage"
import { storage } from "../configs/firebase"
import { UploadMetadata } from "@firebase/storage"
import { ReadStream } from "fs"
import { generate } from "shortid"

interface UploadProps {
	stream: ReadStream
	filename: string
	metadata: UploadMetadata
	dirname?: string
}

export const upload = async ({
	stream,
	filename,
	dirname = "images",
    metadata
}: UploadProps): Promise<string> => {
	const storageRef = ref(storage, `${dirname}/${generate()}-${filename}`)

	const buffer = await streamToBuffer(stream)

	await uploadBytes(storageRef, buffer, metadata)
	const url = getDownloadURL(storageRef)

	return url
}

export const streamToBuffer = (stream: ReadStream): Promise<Buffer> => {
	return new Promise((resolve, reject) => {
		const buffers: any = []

		stream
			.on("data", (chunk) => buffers.push(chunk))
			.on("end", () => resolve(Buffer.concat(buffers)))
			.on("error", reject)
	})
}
