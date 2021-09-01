import IDynamicObject from '../../../IDynamicObject'

interface IQueryOptions {
  limit?: number
  select?: IDynamicObject
  skip?: number
  sort?: IDynamicObject
}

export default IQueryOptions
