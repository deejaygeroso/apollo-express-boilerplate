
import { Request, Response } from 'express'

const sample = (req: Request, res: Response): void => {
  const sampleObject = {
    value: 'Hello World'
  }
  res.header('Content-Type', 'application/json')
  res.send(JSON.stringify(sampleObject, null, 4))
}

export default sample
