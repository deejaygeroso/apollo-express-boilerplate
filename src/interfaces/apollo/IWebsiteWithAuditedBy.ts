import IUser from '../models/IUser'

interface IWebsiteWithAuditedBy {
  _id: string
  auditedBy: IUser
  sitemap: string[]
  url: string
}

export default IWebsiteWithAuditedBy
