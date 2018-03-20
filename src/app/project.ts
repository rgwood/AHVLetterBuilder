export class Project {
	constructor(id: string, name: string, emailToAddress: string, neighbourhood: string, description: string, address: string, tags: string[]){
		this.id = id;
		this.name = name;
		this.emailToAddress = emailToAddress;
		this.neighbourhood = neighbourhood;
		this.description = description;
		this.tags = tags;
		this.address = address;
	}

    id: string;
    name: string;
    emailToAddress: string;
    neighbourhood: string;
	description: string;
	address: string;
    tags: string[];
}
