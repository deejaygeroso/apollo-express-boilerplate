import IPageIssuesCount from '../api/IPageIssuesCount'

interface IPageReport {
  _id: string
  initialIssues: IPageIssuesCount
  currentIssues: IPageIssuesCount
  url: string
}

export default IPageReport
