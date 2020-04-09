import { ApolloError } from 'apollo-server-express'
import { Logger } from '../utilities'
import errorCodes from './errorCodes'

const handleApolloError = (): object => {
  const errorCatch = {
    mutation: (error: object): object => {
      Logger.logError(error, 'Mutation error')
      const mutationOnSaveErrorCode = 6004
      throw new ApolloError(errorCodes[mutationOnSaveErrorCode], mutationOnSaveErrorCode.toString())
    },
    mutationDelete: (error: object): object => {
      Logger.logError(error, 'Mutation delete')
      const mutationOnDeleteErrorCode = 6005
      throw new ApolloError(errorCodes[mutationOnDeleteErrorCode], mutationOnDeleteErrorCode.toString())
    },
    query: (error: object): object => {
      Logger.logError(error, 'Mutation query')
      const queryErrorCode = 6003
      throw new ApolloError(errorCodes[queryErrorCode], queryErrorCode.toString())
    },
  }

  return errorCatch
}

export default handleApolloError()
