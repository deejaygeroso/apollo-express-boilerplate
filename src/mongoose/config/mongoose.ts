import { IError } from '../../interfaces'
import { Logger } from '../../global/utilities'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error: IError): void => {
  Logger.logError('Database connection error!')
  Logger.logError(error)
})

db.once('open', (): void => {
  Logger.logInfo('Database connection successful')
})

export default mongoose
