import IPageIssuesCount from '../api/IPageIssuesCount'

interface IPageReportInput {
  initialIssues: IPageIssuesCount
  currentIssues: IPageIssuesCount
  url: string
}

export default IPageReportInput
