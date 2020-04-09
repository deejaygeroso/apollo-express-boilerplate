import { IReject, IResolve } from '../../interfaces'
import { Logger } from '.'
import nodeFetch from 'node-fetch'

class FetchAPI {
  protected apiURL: string

  constructor(apiURL: string) {
    this.apiURL = apiURL
  }

  protected getRequest = async <TReturnValue>(
    apiRoute: string
  ): Promise<TReturnValue> => {
    return new Promise((resolve: IResolve<TReturnValue>, reject: IReject): void => {
      const url = `${this.apiURL}${apiRoute}`
      nodeFetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'get',
      })
        .then((res: any): TReturnValue => res.json())
        .then((json: TReturnValue): void => {
          resolve(json)
        })
        .catch((error: object): void => {
          Logger.logError(error, `Error ${FetchAPI.name} class`)
          reject(error)
        })
    })
  }

  protected postRequest = async <TParam, TReturnValue>(
    apiRoute: string,
    param: TParam,
  ): Promise<TReturnValue> => {
    return new Promise((resolve: IResolve<TReturnValue>, reject: IReject): void => {
      const url = `${this.apiURL}${apiRoute}`
      nodeFetch(url, {
        body: JSON.stringify(param),
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      })
        .then((res: any): TReturnValue => res.json())
        .then((json: TReturnValue): void => {
          resolve(json)
        })
        .catch((error: object): void => {
          Logger.logError(error, `Error ${FetchAPI.name} class`)
          reject(error)
        })
    })
  }
}

export default FetchAPI
