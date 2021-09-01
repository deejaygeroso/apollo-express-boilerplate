interface IActiveRecordSearchFilter {
  [key: string]: {
    $regex: string
    $options: 'i'
  }
}

export default IActiveRecordSearchFilter
