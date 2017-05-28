export enum PersonalizationType 
{ 
  Relationship, //someone's relationship to the project
  SupportReason, //reason they support it
  ImproveSuggestion //suggestions for improvement
}

export class Personalization {
  type: PersonalizationType;
  id: string;
  description: string;
  appliesToUser: boolean;
  tags: string[];
}
