import { GraphQLResolveInfo } from 'graphql'

/* ----------------------------------------------------------------------------------
 * This method is used to get all requested fields that was sent from the client.
/* ---------------------------------------------------------------------------------- */
const getApolloSelections = (info: GraphQLResolveInfo): string[] => {
  return info.fieldNodes[0].selectionSet.selections.map((field: any): string => field.name.value)
}

export default getApolloSelections
