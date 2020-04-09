interface IIssue {
  code: string
  context: string
  lineNumber?: string
  message: string
  runner?: string
  runnerExtras?: {
    description: string
    help: string
    helpUrl: string
    impact: string
  }
  selector: string
  type: string
  typeCode: number
}

export default IIssue
