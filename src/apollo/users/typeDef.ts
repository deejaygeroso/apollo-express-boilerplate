import { gql } from 'apollo-server-express'

const typeDef = gql`
  type User {
    _id: ID!
    createdAt: String
    email: String
    type: String
    updatedAt: String
  }

  type LoginInfo {
    _id: ID
    email: String
    expiration: String
    token: String
    type: String
  }

  extend type Query {
    user(_id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    userCreate(input: UserCreateInput): User!
    userLogin(input: UserLoginInput): LoginInfo!
    userUpdate(input: UserUpdateInput): User!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserCreateInput {
    email: String!
    password: String!
    type: String!
  }

  input UserUpdateInput {
    _id: String!
    email: String!
    password: String
    type: String!
  }
`

export default typeDef
