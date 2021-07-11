
import {
  IActiveRecordMatchValues,
  IActiveRecordSearchFilter,
  IDynamicObject,
  IModelOptions,
  IModelOptionsInput,
  IReject,
  IResolve,
  ISingleDocModelOptions,
  ISingleDocModelOptionsInput,
} from '../../interfaces'
import Logger from './Logger'
import mongoose from '../../mongoose/config/mongoose'


class ActiveRecord<TModel>{
  protected model: mongoose.Model<TModel>

  constructor(model: mongoose.Model<TModel>) {
    this.model = model
  }

  protected create = async (filter: mongoose.FilterQuery<TModel>): Promise<TModel> => {
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.create(filter,
        (error: mongoose.NativeError, doc: TModel): void => {
          const errorMessageHeader = 'create'
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(doc)
        })
    })
  }

  protected find = async (
    filter: mongoose.FilterQuery<TModel>,
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
        .exec((error: mongoose.NativeError, doc: TModel[]): void => {
          const errorMessageHeader = 'find'
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(doc)
        })
    })
  }

  protected findById = async (
    modelId: string,
    options?: ISingleDocModelOptionsInput
  ): Promise<TModel> => {
    const { select }: ISingleDocModelOptions = this.getValidQueryOptionsForSingleDoc(options)
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.findById(modelId)
        .select(select)
        .exec((error: mongoose.NativeError, doc: TModel): void => {
          const errorMessageHeader = `findById with id: ${modelId}`
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(doc)
        })
    })
  }

  protected findOne = async (
    filter: mongoose.FilterQuery<TModel>,
    options?: IModelOptionsInput
  ): Promise<TModel> => {
    const queryOptions: IModelOptions = this.getValidQueryOptions(options)
    const {
      select,
    }: IModelOptions = queryOptions
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.findOne(filter)
        .select(select)
        .exec((error: mongoose.NativeError, result: TModel): void => {
          const errorMessageHeader = 'findOne'
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(result)
        })
    })
  }

  protected updateById = (modelId: string, document: TModel): Promise<TModel> => {
    return this.update(modelId, document)
  }

  protected update = (
    modelId: string,
    document: TModel,
  ): Promise<TModel> => {
    // We purposely set the type definition of "conditions" variable to "any" to resolve conflict on method findOneAndUpdate.
    // The method is expecting FilterQuery<TModel>. It is basically saying it wants the whole data from TModel, which is WRONG.
    // We only need to pass one property, and that is "_id or the modelId" of the data that needs to be updated.
    const conditions: any = { _id: modelId }
    return new Promise((resolve: IResolve<TModel>, reject: IReject): void => {
      this.model.findOneAndUpdate(
        conditions,
        document,
        {
          new: true
        },
        (error: mongoose.NativeError, doc: TModel): void => {
          const errorMessageHeader = `update with filter: ${JSON.stringify(modelId, null, 4)}`
          this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          resolve(doc)
        }
      )
    })
  }

  protected count = async (
    filter: mongoose.FilterQuery<TModel>,
  ): Promise<number> => {
    return new Promise((resolve: IResolve<number>, reject: IReject): void => {
      this.model
        .countDocuments(filter || {})
        .exec((error: mongoose.NativeError, count: number): void => {
          if (error) {
            const errorMessageHeader = 'count'
            this.checkForErrorThenLogAndReject(error, reject, errorMessageHeader)
          }
          resolve(count)
        })
    })
  }

  protected checkForErrorThenLogAndReject = (error: mongoose.NativeError, reject: IReject, methodName: string): void => {
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
