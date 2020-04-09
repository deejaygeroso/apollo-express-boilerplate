import IDynamicObject from '../IDynamicObject'

interface IModelOptionsInput {
  limit?: number
  select?: string[]
  skip?: number
  sort?: IDynamicObject
}

export default IModelOptionsInput
