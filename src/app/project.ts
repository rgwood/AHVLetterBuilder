export class Project {
	constructor(id: string, name: string, description: string, tags: string[]){
		this.id = id;
		this.name = name;
		this.description = description;
		this.tags = tags;
	}

    id: string;
    name: string;
    description: string;
    tags: string[];
}
