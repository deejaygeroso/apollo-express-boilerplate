import { GraphQLResolveInfo } from 'graphql'

/* ---------------------------------------------------------------------------------- */
/* Since data structure for pagination looks like this.
 * {
 *   data: [Object Data]
 *   limit: Int
 *   skip: Int
 *   total: Int
 * }
 * Mapping out first to get the selections for data field.
/* ---------------------------------------------------------------------------------- */
const getPaginatedApolloSelections = (info: GraphQLResolveInfo): string[] => {
  const selections: string[] = []

  info.fieldNodes[0].selectionSet.selections.forEach((field: any): void => {
    if (field.name.value === 'data') {
      field.selectionSet.selections.forEach((subField: any): void => {
        selections.push(subField.name.value)
      })
    }
  })

  return selections
}

export default getPaginatedApolloSelections
