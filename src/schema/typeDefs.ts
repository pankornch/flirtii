import mutation from "./mutation"
import { gql } from "apollo-server-express"
import input from "./input"
import query from "./query"
import types from "./types"
import subscirption from "./subscription"

const typeDefs = gql`
	${query}
	${mutation}
	${subscirption}
	${types}
	${input}
`

export default typeDefs
