export class Project {
    id: string;
    name: string;
    emailToAddress: string;
    neighbourhood: string;
    description: string;
    tags: string[];

    constructor(id: string, name: string, emailToAddress: string, neighbourhood: string, description: string, tags: string[]){
        this.id = id;
        this.name = name;
        this.emailToAddress = emailToAddress;
        this.neighbourhood = neighbourhood;
        this.description = description;
        this.tags = tags;
    }
}
