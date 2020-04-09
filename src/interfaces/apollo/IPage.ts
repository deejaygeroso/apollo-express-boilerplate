import IIssue from './IIssue'

interface IPage {
  documentTitle: string
  issues: [ IIssue ]
  pageUrl: string
}

export default IPage
