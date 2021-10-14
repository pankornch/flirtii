import { model, Schema, Types } from "mongoose"
import { ILikeUser } from "../types/models"

const LikeUser = model<ILikeUser>(
	"likeUsers",
	new Schema(
		{
			source: {
				type: Types.ObjectId,
				ref: "users",
				required: true,
			},
			target: {
				type: Types.ObjectId,
				ref: "users",
				required: true,
			},
			like: {
				type: Types.ObjectId,
				ref: "likes",
				required: true,
			},
		},
		{ timestamps: true }
	)
)

export default LikeUser
