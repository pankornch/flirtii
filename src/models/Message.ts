import { model, Schema, Types } from "mongoose"
import { IMessage } from "../types/models"

const Message = model<IMessage>(
	"messages",
	new Schema(
		{
			chat: {
				type: Types.ObjectId,
				required: true,
			},
			user: {
				type: Types.ObjectId,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
		},
		{ timestamps: true }
	)
)
export default Message
