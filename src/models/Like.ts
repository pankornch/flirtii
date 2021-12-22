import { model, Schema, Types } from "mongoose"
import { ILike } from "../types/models"

const Like = model<ILike>(
	"likes",
	new Schema(
		{
			source: {
				type: Types.ObjectId,
				required: true,
				ref: "users",
			},
			target: {
				type: Types.ObjectId,
				required: true,
				ref: "users",
			},
			matched: {
				type: Boolean,
				default: () => false,
			},
		},
		{ timestamps: true }
	)
)

export default Like
