import { Injectable } from '@angular/core';
import { Project } from './project';
import { Option } from './option';
import { OptionType } from './option';
import { RandomHelper } from './random-helper';
import { OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import * as Tabletop from 'tabletop';

@Injectable()
export class DataService {

  private projectCache: Project[];
  private optionCache: Option[];
  private textBankCache: {[id: string]: string[]};

  constructor() {
    this.projectCache = new Array<Project>();
    this.optionCache = new Array<Option>();
    this.textBankCache = {};
  }

  init(callback: () => void) {
    Tabletop.init( { key: environment.googleSpreadsheetKey,
                   callback: (data, tabletop) => {
                     this.parseSpreadsheetData(data, tabletop, this.projectCache, this.optionCache, this.textBankCache);
                     callback();
                   } } );
  }

  // the cache parameters are dumb and shouldn't be necessary. For some reason I just couldn't get "this" to bind correctly in this method.
  parseSpreadsheetData = (data: any, tabletop: any, 
    projectCache: Project[], optionCache: Option[], textBankCache: {[id: string] : string[]}) => 
  {
    let projects = data['Projects'].all();
    projects.forEach(function(p){
      //todo: error handling
      let id = p["ID"].replace(/(\r\n|\n|\r)/gm,"");
      let name = p["Name"].replace(/(\r\n|\n|\r)/gm,"");
      let emailAddress = p['Send Emails To'].split('\n').map(a => a.trim());
      let neighbourhood = p["Neighbourhood name"].replace(/(\r\n|\n|\r)/gm,"");
      let description = p["Description"].replace(/(\r\n|\n|\r)/gm,"");
      let address = p["Address"].replace(/(\r\n|\n|\r)/gm, '');
      let tags = (p["Tags"] as string).split(",");
      let fullEmail = p["Full Email"];
      let newProject = new Project(id, name, emailAddress, neighbourhood, description, address, tags, fullEmail);
      projectCache.push(newProject); 
    });

    let options = data['Options'].all();
    options.forEach(function(o){
      // todo: read option data
      const newOption = new Option();
      newOption.type =  OptionType[o['Type'] as string];
      newOption.id = o['ID'];
      newOption.description = o['Description'];
      const tags = o['Tags'] as string;
      if (tags.trim() === '') {
        newOption.tags = [];
      }
      else {
        newOption.tags = (o['Tags'] as string).split(',');
      }
      optionCache.push(newOption);
    });

    const textBank = data['Text Bank'].all();
    textBank.forEach(function(tb){
      const id = tb['ID'] as string;
      const text = tb['Text'] as string;
      if(id in textBankCache){
        textBankCache[id].push(text);
      } else {
        textBankCache[id] = [text];
      }
    });
  }

  getProject(id: string): Project {
    const matches = this.projectCache.filter((p) => {
      return p.id === id;
    });
    if (matches.length === 0) {
      return null;
    } else {
      return matches[0];
    }
  }

  getOptions(type: OptionType): Option[]{
    return this.optionCache.filter(function(o){return o.type === type; });
  }
  getRandomTextBankEntry(id: string): string {
    const sentences = this.textBankCache[id];
    return RandomHelper.RandomString(sentences);
  }

    getRandomBulletPoint(): string{
    const options = ['-', '•'];
    return RandomHelper.RandomString(options);
  }

}
