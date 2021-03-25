interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseTemplateMail {
  templateUrl: string;
  variables: ITemplateVariables;
}
