import { Injectable } from '@angular/core';
import { Project } from './project';
import { Personalization } from './personalization';
import { PersonalizationType } from './personalization';
import { PROJECTS } from './mock-data'; //todo uh don't use hardcoded data
import { PERSONALIZATIONS } from './mock-data'; //ditto

@Injectable()
export class DataService {

  getProject(id: number): Project {
    return PROJECTS.filter(function(p) { return p.id === id; })[0];
  }

  getPersonalizations(type: PersonalizationType): Personalization[]{
    return PERSONALIZATIONS.filter(function(p){return p.type === type});
  }
}
