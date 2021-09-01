import { statusCodesMessages } from '../constants'

const getStatusMessage = (statusCode: number): string => {
  const statusPropertyName: string = statusCode.toString()
  if (statusCodesMessages.hasOwnProperty(statusPropertyName)) {
    return statusCodesMessages[statusPropertyName]
  }
}

export default getStatusMessage
