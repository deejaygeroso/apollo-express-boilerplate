import { GraphQLResolveInfo } from 'graphql'

const getApolloSelections = (info: GraphQLResolveInfo): string[] => {
  return info.fieldNodes[0].selectionSet.selections.map((field: any): string => field.name.value)
}

export default getApolloSelections
