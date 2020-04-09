import {
  IActiveRecordMatchValues,
  IActiveRecordSearchFilter,
  IDynamicObject,
  IModelOptions,
  IModelOptionsInput,
  IMongooseError,
  IReject,
  IResolve,
  ISingleDocModelOptions,
  ISingleDocModelOptionsInput
} from '../../interfaces'
import Logger from './Logger'

class ActiveRecord {
  protected model: any

  constructor(model: any) {
    this.model = model
  }

  protected create = async <TModel, TFilter>(filter: TFilter): Promise<TModel> => {
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.create(filter, (error: IMongooseError, result: TModel): void => {
        const errorMessageHeader = 'create'
        this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
        resolve(result)
      })
    })
  }

  protected find = async <TModel, TFilter>(
    filter: TFilter,
    options?: IModelOptionsInput
  ): Promise<TModel[]> => {
    const {
      limit,
      select,
      skip,
      sort
    }: IModelOptions = this.getValidQueryOptions(options)

    return new Promise((resolve: IResolve<TModel[]>, reject: IReject): void => {
      this.model
        .find(filter || {})
        .select(select)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec((error: IMongooseError, result: TModel[]): void => {
          const errorMessageHeader = 'find'
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(result)
        })
    })
  }

  protected findById = async <TModel>(
    modelId: string,
    options?: ISingleDocModelOptionsInput
  ): Promise<TModel> => {
    const { select }: ISingleDocModelOptions = this.getValidQueryOptionsForSingleDoc(options)
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.findById(modelId)
        .select(select)
        .exec((error: IMongooseError, result: TModel): void => {
          const errorMessageHeader = `findById with id: ${modelId}`
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(result)
        })
    })
  }

  protected findOne = async <TModel, TFilter, TSelectedFields>(
    filter: TFilter,
    options?: IModelOptionsInput
  ): Promise<TModel> => {
    const queryOptions: IModelOptions = this.getValidQueryOptions(options)
    const {
      select,
    }: IModelOptions = queryOptions
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.findOne(filter)
        .select(select)
        .exec((error: IMongooseError, result: TModel): void => {
          const errorMessageHeader = 'findOne'
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(result)
        })
    })
  }

  protected updateById = <TModel, TFilter>(modelId: string, document: TFilter): Promise<TModel> => {
    return this.update({ _id: modelId }, document)
  }

  protected update = <TModel, TDocument, TFilter>(
    filter: TFilter,
    document: TDocument
  ): Promise<TModel> => {
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.findOneAndUpdate(
        filter,
        {
          $set: document
        },
        {
          new: true
        },
        (error: IMongooseError, result: any): void => {
          const errorMessageHeader = `update with filter: ${JSON.stringify(filter, null, 4)}`
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(result)
        }
      )
    })
  }

  protected count = async <TFilter>(
    filter: TFilter,
  ): Promise<number> => {
    return new Promise((resolve: IResolve<number>, reject: IReject): void => {
      this.model
        .countDocuments(filter || {})
        .exec((countError: IMongooseError, count: number): void => {
          if (countError) {
            const errorMessageHeader = 'count'
            this.checkForErrorThenLogAndReject(countError, reject, errorMessageHeader)
          }
          resolve(count)
        })
    })
  }

  protected checkForErrorThenLogAndReject = (error: IMongooseError, reject: IReject, methodName: string): void => {
    if (error) {
      Logger.logError(error, `Error on '${this.model.modelName}' class on method '${methodName}'`)
      reject(error)
    }
  }

  protected generateMatchValuesFilter = (property: string, list: string[] = []): IActiveRecordMatchValues => {
    if (!list || list.length === 0) {
      return null
    }

    return {
      [property]: {
        $in: list
      }
    }
  }

  protected generateSearchFilter = (property: string, value: string): IActiveRecordSearchFilter => {
    return {
      [property]: { $regex: value, $options: 'i' }
    }
  }

  private getValidQueryOptionsForSingleDoc = (options: ISingleDocModelOptionsInput): ISingleDocModelOptions => {
    if (!options) {
      return {}
    }

    return {
      select: options && options.select || null
    }
  }

  private getValidQueryOptions = (options: IModelOptionsInput): IModelOptions => {
    if (!options) {
      return {}
    }

    const {
      limit,
      select,
      skip,
      sort,
    } = options

    return {
      limit: limit || null,
      select: this.generateSelectedFieldsToBeReturned(select),
      skip: skip || null,
      sort: sort || null,
    }
  }

  private generateSelectedFieldsToBeReturned = (selections: string[] = []): IDynamicObject => {
    if (selections.length === 0) {
      return null
    }

    const selectedFields: IDynamicObject = {}
    if (selections.length !== 0) {
      selections.forEach((field: string): void => {
        selectedFields[field] = 1
      })
    }
    return selectedFields
  }
}

export default ActiveRecord
