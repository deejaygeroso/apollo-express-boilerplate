import { IError } from '../../interfaces'
import { Logger } from '../../global/utilities'
import mongoose from 'mongoose'
import { processENV } from '../../global/constants'

mongoose.connect(processENV.mongoURL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error: IError): void => {
  Logger.logError(error, 'Database connection error!')
})

db.once('open', (): void => {
  Logger.logInfo('Database connection successful')
})

export default mongoose
