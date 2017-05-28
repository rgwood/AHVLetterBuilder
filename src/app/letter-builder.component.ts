import { Component } from '@angular/core';
import { Project } from './project';
import { Personalization } from './personalization';
import { PersonalizationType } from './personalization';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './letter-builder.component.html',
  providers: [DataService]
})
export class LetterBuilderComponent {
  constructor(private dataService: DataService) { }

  title = 'AHV Letter Builder';
  project: Project
  relationships: Personalization[]
  supportReasons: Personalization[]
  improveSuggestions: Personalization[]
  name: string;
  emailAddress: string;
  physicalAddress: string;
  letter: string;

  ngOnInit(): void {
    var projectId = Number(this.getQueryParams(location.search)['p']);
    console.log('project ID: ' + projectId);
    this.project = this.dataService.getProject(projectId || 1); //the "not found" project. todo: a proper 404 page?
    this.relationships = this.getApplicablePersonalizationsForProject(this.project, this.dataService.getPersonalizations(PersonalizationType.Relationship));
    this.supportReasons = this.getApplicablePersonalizationsForProject(this.project, this.dataService.getPersonalizations(PersonalizationType.SupportReason));
    this.improveSuggestions = this.getApplicablePersonalizationsForProject(this.project, this.dataService.getPersonalizations(PersonalizationType.ImproveSuggestion));
  }

  generateText(): void {
    this.letter = '';
    let textBank = this.dataService.getTextBank();
    this.relationships.filter(function (r) { return r.appliesToUser; }).forEach(element => {
      if(textBank[element.id])
      {
        this.letter += this.dataService.getRandomTextBankEntry(element.id);
      }
      // todo: footer, etc.
    });
  }

  getApplicablePersonalizationsForProject(project: Project, allReasons: Personalization[]): Personalization[] {
    var ret = allReasons.filter(function (r) { return r.tags.length === 0; });
    project.tags.forEach(tag => {
      var tagMatches = allReasons.filter(function (r) { return r.tags.includes(tag) });
      ret = ret.concat(tagMatches);
    });
    return ret;
  }

  getQueryParams(qs: string) : {} {
    qs = qs.split('+').join(' ');

    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }
}
