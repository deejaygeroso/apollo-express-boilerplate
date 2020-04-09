import IDynamicObject from '../IDynamicObject'

interface IAuditQueryOptions {
  limit?: number
  select?: string[]
  skip?: number
  sort?: IDynamicObject
}

export default IAuditQueryOptions
