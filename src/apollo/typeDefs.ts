import { gql } from 'apollo-server-express'
import users from './users/typeDef'

const typeDef = gql`
  type Query
  type Mutation
`

const typeDefs = [
  typeDef,
  users,
]

export default typeDefs
