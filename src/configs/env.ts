import dotenv from "dotenv"
dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET"
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/flirtii"
export const PORT = process.env.PORT || 4000

