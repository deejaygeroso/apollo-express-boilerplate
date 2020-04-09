interface IPa11y {
  documentTitle: string
  issues: {
    code: string
    context: string
    message: string
    runner: string
    runnerExtras: {
      description: string
      impact: string
      help: string
      helpUrl: string
    }
    selector: string
    type: string
    typeCode: number
  }[]
  pageUrl: string
}

export default IPa11y
