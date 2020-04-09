interface IUserType {
  type: string
}

interface IUserTypeOption {
  $or: IUserType[]
}

export default IUserTypeOption
