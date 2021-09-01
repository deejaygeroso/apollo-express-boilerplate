/* ----------------------------------------------------------------------------------
 * Standard Server Status Codes
 * ----------------------------------------------------------------------------------
 * 200: OK. The standard success code and default option.
 * 201: Object created. Useful for the store actions.
 * 204: No content. When an action was executed successfully, but there is no content to return.
 * 206: Partial content. Useful when you have to return a paginated list of resources.
 * 400: Bad request. The standard option for requests that fail to pass validation.
 * 401: Unauthorized. The user needs to be authenticated.
 * 403: Forbidden. The user is authenticated, but does not have the permissions to perform an action.
 * 404: Not found. This will be returned automatically by Laravel when the resource is not found.
 * 500: Internal server error. Ideally you're not going to be explicitly returning this, but if something unexpected breaks,
 *      this is what your user is going to receive.
 * 503: Service unavailable. Pretty self explanatory, but also another code that is not going to be
 *      returned explicitly by the application.
 * ---------------------------------------------------------------------------------- */

const statusCodes = {
  badRequest: 400,
  forbidden: 403,
  internalServerError: 500,
  objectCreated: 201,
  ok: 200,
  noContent: 204,
  notFound: 404,
  partialContent: 206,
  serviceUnavailable: 503,
  unAuthorized: 401,
}

export default statusCodes
