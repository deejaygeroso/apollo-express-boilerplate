interface IStatusCodeMessages {
  [key: string]: string
}

const statusCodesMessages: IStatusCodeMessages = {
  /* ----------------------------------------------------------------------------------
   * Standard Server Status Codes
   * ---------------------------------------------------------------------------------- */
  '200': 'OK',
  '201': 'Object created',
  '204': 'No content',
  '206': 'Partial content',
  '400': 'Bad request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not found',
  '500': 'Service unavailable',
}

export default statusCodesMessages
