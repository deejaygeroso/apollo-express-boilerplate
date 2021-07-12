import { IError } from '../../interfaces'
import debug from 'debug'

/* ----------------------------------------------------------------------------------
 * Logger class version 1.0.0
/* ---------------------------------------------------------------------------------- */
class Logger {
  // NOTE: debug method should only be used for debugging.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static debug = (input: any, title?: string): void => {
    Logger.debugLogForDebugging('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    Logger.debugLogForDebugging(title)
    Logger.debugLogForDebugging(Logger.prettify(input))
    Logger.debugLogForDebugging('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  }

  public static logInfo = (input: string): void => {
    Logger.debugInfo(Logger.prettify(input))
  }

  // Could expect IError, which is a built in error protocol for the application.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static logError = (input: IError | any, title?: string): void => {
    Logger.debugError('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    if (title) {
      Logger.debugError(title)
    }

    if (Logger.checkIfErrorCodeProtocol(input)) {
      Logger.debugError(`${input.code}: ${input.message}`)
    } else {
      Logger.debugError(Logger.prettify(input))
    }

    Logger.debugError('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n')
  }

  public static logSuccess = (message: string): void => {
    if (!message) {
      const defaultMessage = 'Action successful!'
      Logger.debugSuccess(defaultMessage)
    }
    Logger.debugSuccess(message)
  }

  private static debugError = debug('app:error')
  private static debugInfo = debug('app:info')
  private static debugSuccess = debug('app:success')
  private static debugLogForDebugging = debug('app:debug')

  private static checkIfErrorCodeProtocol = (input: any): boolean => {
    return Logger.isObject(input) && input.code && input.message
  }

  private static prettify = (input: any): any => {
    if (Logger.isObject(input)) {
      return JSON.stringify(input, null, 4)
    }
    return input
  }

  private static isObject = (input: any): boolean => {
    return typeof input === 'object'
  }
}

export default Logger
