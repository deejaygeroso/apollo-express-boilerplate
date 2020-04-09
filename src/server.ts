// tslint:disable-next-line: no-var-requires
require('dotenv').config()

import express, { Request, Response } from 'express'
import { handleAppError, logApiRequests } from './global/functions'
import { Logger } from './global/utilities'
import apiRoute from './apiRoute'
import apollo from './apollo'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

class Server {
  public app = express()
  private port = process.env.PORT
  private server = apollo

  constructor() {
    this.middleware()
    this.initRoutes()
    handleAppError(this.app) // Must be invoked after initRoutes()
    this.listen()
  }

  private middleware = (): void => {
    this.app.use(bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    }))
    this.app.use(bodyParser.json({
      limit: '50mb'
    }))
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
