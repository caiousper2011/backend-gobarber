import { IParseTemplateMail } from '../dtos/IParseTemplateMail';

export interface IMailTemplateProvider {
  parse(data: IParseTemplateMail): Promise<string>;
}
