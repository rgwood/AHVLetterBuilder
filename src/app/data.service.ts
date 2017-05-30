import { Injectable } from '@angular/core';
import { Project } from './project';
import { Personalization } from './personalization';
import { PersonalizationType } from './personalization';
import { PERSONALIZATIONS } from './mock-data'; //todo uh don't use hardcoded data
import { OnInit } from '@angular/core';
import * as Tabletop from 'tabletop';

@Injectable()
export class DataService {

  private projectCache: Project[];


  constructor(){
    this.projectCache = new Array<Project>();
  }

  init(callback: ()=> void)
  {
    //todo: don't hardcode key? Ahh who cares
    Tabletop.init( { key: '1kIkLMFe6VG8Fgpy0bLgLdelFzXppda0yl4jdKo9WICM',
                   callback: (data, tabletop) => {
                     this.handleProjectData(data, tabletop, this.projectCache);
                     callback();
                   }, 
                   simpleSheet: true } );
  }

  //this cache parameter is dumb and shouldn't be necessary. For some reason I just couldn't get "this" to bind correctly in this method.
  handleProjectData = (data: any, tabletop: any, cache: Project[]) => 
  {
    let array = data as object[];
    array.forEach(function(p){
      //todo: error handling
      let id = p["ID"];
      let name = p["Name"];
      let description = p["Description"];
      let tags = (p["Tags"] as string).split(",");
      let newProject = new Project(id, name, description, tags);
      cache.push(newProject); 
    });
  }

  getProject(id: string): Project {
    let matches = this.projectCache.filter(function(p) { return p.id === id; });
    if(matches.length == 0)
      return null;
    else
      return matches[0];
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
    map["wantLiveNearby"] = ["I want to live nearby.","Lemme live nearby","Cmon, let me live nearby"];
    return map;
  }
  getRandomIntInclusive(min, max): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
