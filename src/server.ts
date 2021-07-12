// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import express, { Request, Response } from 'express'
import { handleAppError, logApiRequests } from './global/functions'
import { Logger } from './global/utilities'
import apiRoute from './api'
import apollo from './apollo'
import cors from 'cors'
import path from 'path'
import { processENV } from './global/constants'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

class Server {
  public app = express()
  private port = processENV.port
  private server = apollo

  constructor() {
    this.middleware()
    this.initRoutes()
    handleAppError(this.app) // Must be invoked after initRoutes()
    this.listen()
  }

  private middleware = (): void => {
    // The extended option allows to choose between parsing the URL-encoded
    // data with the querystring library (when false) or the qs library (when true)
    // https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
    this.app.use(express.json({ limit: '50mb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }))

    this.app.use(cors({
      credentials: true,
      origin: true,
    }))

    this.app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))
    this.server.applyMiddleware({
      app: this.app,
      cors: false,
      path: '/graphql',
    })

    this.app.use(logApiRequests()) // Must be invoked after bodyParser.
  }

  private initRoutes = (): void => {
    this.app.use('/api', apiRoute)
    this.app.use('/robots.txt', (req: Request, res: Response): void => {
      res.sendFile(path.join(__dirname + '/../robots.txt'))
    })
    this.app.use('/', (req: Request, res: Response): void => {
      res.send('Apollo Express Server')
    })
  }

  private listen = (): void => {
    this.app.listen(this.port, (): void => {
      Logger.logInfo(`App listening on port ${this.port}!`)
    })
  }
}

const server = new Server()

export default server.app
