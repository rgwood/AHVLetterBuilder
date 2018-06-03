export class Project {
    id: string;
    name: string;
    emailToAddresses: string[];
    neighbourhood: string;
	description: string;
	address: string;
    tags: string[];
    fullEmail: string;

    constructor(id: string, name: string, emailToAddresses: string[], neighbourhood: string, description: string, address: string, tags: string[], fullEmail: string){
        this.id = id;
        this.name = name;
        this.emailToAddresses = emailToAddresses;
        this.neighbourhood = neighbourhood;
        this.description = description;
        this.address = address;
        this.tags = tags;
        this.fullEmail = fullEmail;
    }
}
