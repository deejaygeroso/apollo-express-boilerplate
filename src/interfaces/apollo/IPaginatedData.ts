interface IPaginatedData<TModel> {
  data: TModel
  limit: number
  skip: number
  total: number
}

export default IPaginatedData
