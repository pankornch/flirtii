import { gql } from "apollo-server-express"

const input = gql`
	input SignInInput {
		username: String!
		password: String!
	}

    input SignUpInput {
        username: String!
        password: String!
        confirmPassword: String!
        firstName: String!
        lastName: String!
    }
`

export default input