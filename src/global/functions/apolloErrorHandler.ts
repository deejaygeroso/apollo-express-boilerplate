import { ApolloError } from 'apollo-server-express'
import { Logger } from '../utilities'
import errorCodes from './errorCodes'

type IError = undefined

interface IErrorCatch {
  mutation: (error: IError) => void
  mutationDelete: (error: IError) => void
  query: (error: IError) => void
}

const handleApolloError = (): IErrorCatch => {
  const errorCatch = {
    mutation: (error: IError): void => {
      Logger.logError(error, 'Mutation error')
      const mutationOnSaveErrorCode = 6004
      throw new ApolloError(errorCodes[mutationOnSaveErrorCode], mutationOnSaveErrorCode.toString())
    },
    mutationDelete: (error: IError): void => {
      Logger.logError(error, 'Mutation delete')
      const mutationOnDeleteErrorCode = 6005
      throw new ApolloError(errorCodes[mutationOnDeleteErrorCode], mutationOnDeleteErrorCode.toString())
    },
    query: (error: IError): void => {
      Logger.logError(error, 'Mutation query')
      const queryErrorCode = 6003
      throw new ApolloError(errorCodes[queryErrorCode], queryErrorCode.toString())
    },
  }

  return errorCatch
}

export default handleApolloError()
