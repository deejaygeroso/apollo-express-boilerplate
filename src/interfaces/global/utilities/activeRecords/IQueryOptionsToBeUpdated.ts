import IDynamicObject from '../../../IDynamicObject'

interface IQueryOptionsToBeUpdated {
  limit?: number
  select?: string[]
  skip?: number
  sort?: IDynamicObject
}

export default IQueryOptionsToBeUpdated
