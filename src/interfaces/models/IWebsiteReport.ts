import IPageReport from './IPageReport'

interface IWebsiteReport {
  _id: string
  createdAt: string
  pagesReport: IPageReport[]
  websiteId: string
  updatedAt: string
  url: string
}

export default IWebsiteReport
