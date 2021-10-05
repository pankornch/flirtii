import { gql } from "apollo-server-express"

const query = gql`
	type Query {
		hello: String!
	}
`
export default query