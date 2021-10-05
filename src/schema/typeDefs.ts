import mutation from "./mutation"
import { gql } from "apollo-server-express"
import input from "./input"
import query from "./query"
import types from "./types"

const typeDefs = gql`
	${query}
	${mutation}
	${types}
	${input}
`

export default typeDefs
