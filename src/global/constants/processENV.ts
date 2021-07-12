const processENV = {
  authSecret: process.env.AUTH_SECRET,
  env: process.env.ENV,
  mongoURL: process.env.MONGO_URL,
  port: process.env.PORT,
}

export default processENV
