import { NextFunction, Request, Response } from 'express'
import { IExpressHook } from '../../interfaces'
import { Logger } from '../utilities'

const logApiRequests = (): IExpressHook => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.path.startsWith('/api')) {
      const message = `\n${req.method} + ${req.path}` +
        `\nreq.headers: ${JSON.stringify(req.headers, null, 2)}` +
        `\nreq.body: ${JSON.stringify(req.body, null, 2)}`
      Logger.logInfo(message)
    }
    next()
  }
}

export default logApiRequests
