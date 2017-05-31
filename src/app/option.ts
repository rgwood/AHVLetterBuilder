export enum OptionType 
{ 
  Relationship, //someone's relationship to the project
  SupportReason, //reason they support it
  Improvement //suggestions for improvement
}

export class Option {
  type: OptionType;
  id: string;
  description: string;
  tags: string[];
  appliesToUser: boolean;
}
