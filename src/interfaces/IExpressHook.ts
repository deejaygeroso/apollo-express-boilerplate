import { NextFunction, Request, Response } from 'express'
type IExpressHook = (req: Request, res: Response, next: NextFunction) => void

export default IExpressHook
