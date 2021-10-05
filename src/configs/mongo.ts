import mongoose from "mongoose"
import { MONGO_URI } from "./env"

export default () => mongoose.connect(MONGO_URI)