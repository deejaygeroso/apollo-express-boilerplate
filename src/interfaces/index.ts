/* ----------------------------------------------------------------------------------
 * Interfaces that is used anywhere in the app.
/* ---------------------------------------------------------------------------------- */
export { default as IDynamicObject } from './IDynamicObject'
export { default as IError } from './IError'
export { default as IReject } from './IReject'
export { default as IResolve } from './IResolve'

/* ----------------------------------------------------------------------------------
* Apollo Interfaces
/* ---------------------------------------------------------------------------------- */
export { default as IPaginatedData } from './apollo/IPaginatedData'
// apollo > users
export { default as IAuthenticatedUser } from './apollo/users/IAuthenticatedUser'
export { default as IUserCreateInput } from './apollo/users/IUserCreateInput'
export { default as IUserUpdateInput } from './apollo/users/IUserUpdateInput'

/* ----------------------------------------------------------------------------------
* Global Directory Interfaces
/* ---------------------------------------------------------------------------------- */
// global > functions
export { default as IExpressHook } from './global/functions/IExpressHook'
// global > lib > activeRecords
export { default as IActiveRecordMatchValues } from './global/lib/activeRecords/IActiveRecordMatchValues'
export { default as IActiveRecordSearchFilter } from './global/lib/activeRecords/IActiveRecordSearchFilter'
export { default as IQueryOptions } from './global/lib/activeRecords/IQueryOptions'
export { default as IQueryOptionsToBeUpdated } from './global/lib/activeRecords/IQueryOptionsToBeUpdated'

/* ----------------------------------------------------------------------------------
 * Mongoose Model Interfaces
/* ---------------------------------------------------------------------------------- */
export { default as ISingleDocModelOptions } from './models/ISingleDocModelOptions'
export { default as ISingleDocModelOptionsInput } from './models/ISingleDocModelOptionsInput'
// model > users
export { default as IUser } from './models/users/IUser'
export { default as IUserCreateInputPasswordHashed } from './models/users/IUserCreateInputPasswordHashed'
export { default as IUserTypes } from './models/users/IUserTypes'
export { default as IUserTypeFilterQuery } from './models/users/IUserTypeFilterQuery'
export { default as IUserUpdateInputPasswordHashed } from './models/users/IUserUpdateInputPasswordHashed'
