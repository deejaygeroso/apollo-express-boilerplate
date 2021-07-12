import IUserTypes from './IUserTypes'

interface IUserTypeFilterQuery {
  $or: { type: IUserTypes }[]
}

export default IUserTypeFilterQuery
