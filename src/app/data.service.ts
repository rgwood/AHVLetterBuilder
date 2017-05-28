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
  getRandomTextBankEntry(id: string): string {
    let sentences = this.getTextBank()[id];
    return sentences[this.getRandomIntInclusive(0, sentences.length -1)];
  }

//todo: this is terrible, store the data somewhere better and maybe memoize it
  getTextBank(): {[id: string] : string[]} {
    let map: { [id: string]: string[]; } = { };
    map["wantLiveNearby"] = ["I want to live nearby.","Lemme live nearby"];
    return map;
  }
  getRandomIntInclusive(min, max): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
