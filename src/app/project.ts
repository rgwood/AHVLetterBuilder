export class Project {
	constructor(id: string, name: string, neighbourhood: string, description: string, tags: string[]){
		this.id = id;
		this.name = name;
		this.neighbourhood = neighbourhood;
		this.description = description;
		this.tags = tags;
	}

    id: string;
    name: string;
    neighbourhood: string;
    description: string;
    tags: string[];
}
