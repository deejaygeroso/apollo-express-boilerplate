import IWebsiteReport from '../models/IWebsiteReport'

interface IUserWebsiteReports {
  _id: string
  email: string
  websiteReports: IWebsiteReport[]
}

export default IUserWebsiteReports
