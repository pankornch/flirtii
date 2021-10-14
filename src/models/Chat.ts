import { model, Schema, Types } from "mongoose"
import { IChat } from "../types/models"

const Chat = model<IChat>(
	"chat",
	new Schema(
		{
			users: [{ type: Types.ObjectId }],
		},
		{ timestamps: true }
	)
)

export default Chat
