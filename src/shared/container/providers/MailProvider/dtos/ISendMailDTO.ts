import { IParseTemplateMail } from '@shared/container/providers/MailTemplateProvider/dtos/IParseTemplateMail';

interface IMailContact {
  name: string;
  email: string;
}
export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseTemplateMail;
}
