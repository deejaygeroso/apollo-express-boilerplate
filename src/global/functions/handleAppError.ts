import { Express, Request, Response } from 'express'
import { IError } from '../../interfaces'
import { Logger } from '../utilities'

const handleAppError = (app: Express): void => {
  app.use(
    (
      error: IError,
      req: Request,
      res: Response,
    ): void => {
      Logger.logError(error, 'App error')
      res.json({ error })
    }
  )
}

export default handleAppError
