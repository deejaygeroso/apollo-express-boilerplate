import IWebsite from '../apollo/IWebsite'

interface ILead {
  _id: string
  companyName: string
  email: string
  fullName: string
  otherWebsiteURL: string[]
  phoneNumber: string
  primaryWebsiteURL: string
  scanType: string
  websites: IWebsite[]
}

export default ILead
