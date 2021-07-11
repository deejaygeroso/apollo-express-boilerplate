import { ApolloServer } from 'apollo-server-express'
import { AuthService } from '../services'
import { Request } from 'express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const apolloServerInit = new ApolloServer({
  context: ({ req }: { req: Request }): any => {
    const token = req.headers.authorization || null

    const authService = new AuthService()
    const auth = authService.getAuthDecodedToken(token)

    return { auth }
  },
  playground: process.env.ENV !== 'production', // Should be renamed to prod to disable @ production.
  resolvers,
  typeDefs,
})

export default apolloServerInit
