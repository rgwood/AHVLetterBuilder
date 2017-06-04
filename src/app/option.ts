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

//this feels really unnecessary but for some reason Angular blows  up if I bind forms to strings instead of string properties...
export class CustomOption
{
	constructor(text:string){
		this.text = text;
	}

	public text: string;
}