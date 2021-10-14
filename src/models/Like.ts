import { model, Schema, Types } from "mongoose"
import { ILike } from "../types/models"

const Like = model<ILike>(
	"likes",
	new Schema(
		{
			users: [
				{
					type: Types.ObjectId,
					ref: "users",
					required: true,
				},
			],
			matched: {
				type: Boolean,
				default: () => false,
			},
		},
		{ timestamps: true }
	)
)

export default Like
