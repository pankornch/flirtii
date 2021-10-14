import { ApolloServer } from "apollo-server-express"
import express from "express"
import http from "http"

import { execute, subscribe } from "graphql"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { PubSub } from "graphql-subscriptions"
// import { graphqlUploadExpress } from "graphql-upload"

import { PORT } from "./configs/env"
import db from "./configs/mongo"
import typeDefs from "./schema/typeDefs"
import resolvers from "./resolvers"

const app = express()
const httpServer = http.createServer(app)
const pubsub = new PubSub()

const schema = makeExecutableSchema({ typeDefs, resolvers })

const startServer = async () => {
	const server = new ApolloServer({
		schema,
		context({ req }) {
			const authorization = req.headers.authorization
			return { req, pubsub, authorization }
		},
	})

	await server.start()
	server.applyMiddleware({ app })

	SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
			onConnect(params: any, _: any) {
				const authorization = params.Authorization
				return { params, pubsub, authorization }
			},
		},
		{ server: httpServer, path: server.graphqlPath }
	)

	await db()

	httpServer.listen(PORT, () => {
		console.log(
			`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
		)
		console.log(
			`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
		)
	})
}

startServer()
