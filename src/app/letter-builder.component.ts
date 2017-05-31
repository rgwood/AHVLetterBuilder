import { Component } from '@angular/core';
import { Project } from './project';
import { Option } from './option';
import { OptionType } from './option';
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
  relationships: Option[]
  supportReasons: Option[]
  improvements: Option[]
  name: string;
  emailAddress: string;
  physicalAddress: string;
  letter: string;
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.dataService.init(() => {
      console.log('data loaded baby!!!');
      var projectId = this.getQueryParams(location.search)['p'];
      var proj = this.dataService.getProject(projectId);
      if(proj == null)
        this.project = new Project('404', '404','Project not found',[]);
      else
        this.project = this.dataService.getProject(projectId);

      this.relationships = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Relationship));
      this.supportReasons = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.SupportReason));
      this.improvements = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Improvement));
      this.dataLoaded = true;
    });
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

  getApplicableOptionsForProject(project: Project, allOptions: Option[]): Option[] {
    var ret = allOptions.filter(function (r) { return r.tags.length === 0; });
    project.tags.forEach(tag => {
      var tagMatches = allOptions.filter(function (r) { return r.tags.includes(tag) });
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
