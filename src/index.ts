import Server from './Server'
import initializeMongoDB from './mongoose/config/initializeMongoDB'
import { processENV } from './global/constants'

initializeMongoDB(processENV.mongoURL, (): void => {
  const serverName = 'Apollo Express Server'
  const app = new Server(serverName, processENV.port)
  app.init()
})
