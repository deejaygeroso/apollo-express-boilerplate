import IWebsite from '../apollo/IWebsite'

interface ILeadAddInput {
  companyName: string
  email: string
  fullName: string
  otherWebsiteURL: string[]
  phoneNumber: string
  primaryWebsiteURL: string
  scanType: string
  websites: IWebsite[]
}

export default ILeadAddInput
