import IDynamicObject from '../IDynamicObject'

interface IModelOptions {
  limit?: number
  select?: IDynamicObject
  skip?: number
  sort?: IDynamicObject
}

export default IModelOptions
