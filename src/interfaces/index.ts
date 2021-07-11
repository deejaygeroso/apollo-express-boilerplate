/* ----------------------------------------------------------------------------------
 * Interfaces that is used anywhere in the app.
/* ---------------------------------------------------------------------------------- */
export { default as IDynamicObject } from './IDynamicObject'
export { default as IError } from './IError'
export { default as IExpressHook } from './IExpressHook'
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
export { default as IActiveRecordMatchValues } from './global/utilities/IActiveRecordMatchValues'
export { default as IActiveRecordSearchFilter } from './global/utilities/IActiveRecordSearchFilter'

/* ----------------------------------------------------------------------------------
 * Mongoose Model Interfaces
/* ---------------------------------------------------------------------------------- */
export { default as IModelOptions } from './models/IModelOptions'
export { default as IModelOptionsInput } from './models/IModelOptionsInput'
export { default as ISingleDocModelOptions } from './models/ISingleDocModelOptions'
export { default as ISingleDocModelOptionsInput } from './models/ISingleDocModelOptionsInput'
// model > users
export { default as IUser } from './models/users/IUser'
export { default as IUserCreateInputPasswordHashed } from './models/users/IUserCreateInputPasswordHashed'
export { default as IUserTypes } from './models/users/IUserTypes'
export { default as IUserTypeFilterQuery } from './models/users/IUserTypeFilterQuery'
export { default as IUserUpdateInputPasswordHashed } from './models/users/IUserUpdateInputPasswordHashed'
