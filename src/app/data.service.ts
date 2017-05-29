import { Injectable } from '@angular/core';
import { Project } from './project';
import { Personalization } from './personalization';
import { PersonalizationType } from './personalization';
import { PROJECTS } from './mock-data'; //todo uh don't use hardcoded data
import { PERSONALIZATIONS } from './mock-data'; //ditto
import { OnInit } from '@angular/core';
import * as Tabletop from 'tabletop';

@Injectable()
export class DataService {

  public projectCache: Project[];

  handleProjectData = (data: any, tabletop: any) =>
  {
    this.projectCache = new Array<Project>();
    let array = data as object[];
    array.forEach(function(p){
      //todo: error handling
      let newProject = new Project();
      newProject.id = Number(p["ID"]);
      newProject.name = p["Name"];
      newProject.description = p["Description"];
      newProject.tags = (p["Tags"] as string).split(",");
      this.projectCache.push(newProject); 
      console.log(newProject.name +' added to cache');
    });

  }
  //loadProjectsFromSpreadsheet(): Promise<null>
  getProject(id: number): Promise<Project> {
    if(this.projectCache != null)
    {
      return new Promise(resolve => {resolve(PROJECTS[1])});
    }
    else
    {
    
    }

    return new Promise(resolve => {
    // Simulate server latency with 2 second delay
    //setTimeout(() => resolve(PROJECTS[1]), 2000);});

    //todo revert 
    
          Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1kIkLMFe6VG8Fgpy0bLgLdelFzXppda0yl4jdKo9WICM/pubhtml',
                   callback: this.handleProjectData, 
                   simpleSheet: true } )});


    //}
    /*console.log('projectLoadingFinished: '+ this.projectLoadingFinished);
    var intvl = setInterval(function() {
      if (this.projectLoadingFinished === true) { 
        console.log('project loading finished, i guess');

        clearInterval(intvl);}}, 10000);//todo change back to a quick timer
    */
    //return this.projectCache.filter(function(p) { return p.id === id; })[0];
    
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
