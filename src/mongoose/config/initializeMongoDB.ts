import { IError } from '../../interfaces'
import { Logger } from '../../global/lib'
import mongoose from 'mongoose'

const initializeMongoDB = (mongoURL: string, cb: () => void): void => {
  mongoose.connect(mongoURL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = mongoose.connection

  db.on('error', (error: IError): void => {
    Logger.logError(error, 'Database connection error!')
  })

  db.once('open', (): void => {
    Logger.logInfo('Database connection successful')
    cb()
  })
}

export default initializeMongoDB
