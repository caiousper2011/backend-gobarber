import handlebars from 'handlebars';
import fs from 'fs';
import { IMailTemplateProvider } from '../models/IMailTemplateProvider';
import { IParseTemplateMail } from '../dtos/IParseTemplateMail';

export default class HandleBarsMailTemplateProvider
  implements IMailTemplateProvider {
  async parse({ templateUrl, variables }: IParseTemplateMail): Promise<string> {
    const templateContent = await fs.promises.readFile(templateUrl, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateContent);
    return parseTemplate(variables);
  }
}
