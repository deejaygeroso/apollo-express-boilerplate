import express from 'express'

const handleAsyncErrors = (fn: express.Handler): express.Handler => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    fn(req, res, next)
  }
}

export default handleAsyncErrors
