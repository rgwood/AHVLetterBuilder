import { Component } from '@angular/core';
import { Project } from './project';
import { Option } from './option';
import { CustomOption } from './option';
import { OptionType } from './option';
import { DataService } from './data.service';
import { RandomHelper } from './random-helper';
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
  customRelationship: string
  supportReasons: Option[]
  customSupportReasons: CustomOption[]
  improvements: Option[]
  customImprovements: CustomOption[]
  name: string;
  emailAddress: string;
  physicalAddress: string;
  letterSubject: string
  letterBody: string;
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.dataService.init(() => {
      var projectId = this.getQueryParams(location.search)['p'];
      var proj = this.dataService.getProject(projectId);
      if(proj == null)
        this.project = new Project('404', '404','Project not found',[]);
      else
        this.project = this.dataService.getProject(projectId);

      this.relationships = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Relationship));
      this.supportReasons = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.SupportReason));
      this.customSupportReasons = [];
      this.improvements = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Improvement));
      this.customImprovements = [];
      this.dataLoaded = true;
    });
  }

  generateText(): void {
    //todo: warn if we would overwrite existing text
    let bullet = this.dataService.getRandomBulletPoint();

    this.letterSubject = this.getText('emailSubject');
    this.letterBody = '';
    this.addLine(this.getText('firstLine'));
    this.addLineBreak();
    this.addSentence(this.getText('openingSentence'));

    this.relationships.filter(function (r) { return r.appliesToUser; }).forEach(element => {
      this.addSentence(this.getText(element.id));
    });
    if(this.customRelationship && this.customRelationship.trim() != '')
      this.addSentence(this.customRelationship);
    this.addLineBreak();
    this.addLineBreak();

    this.addSentence(this.getText('supportReasonIntroStart'));
    this.addLine(this.getText('supportReasonIntroEnd'));
    this.supportReasons.filter(function (r) { return r.appliesToUser; }).forEach(element => {
      this.addLineItem(bullet, this.getText(element.id));
    });
    this.customSupportReasons.forEach( r => {
      this.addLineItem(bullet, r.text);
    });
    this.addLineBreak();

    this.addLine(this.getText('improvementIntro'));
    this.improvements.filter(function (r) { return r.appliesToUser; }).forEach(element => {
      this.addLineItem(bullet, this.getText(element.id));
    });
    this.customImprovements.forEach( r => {
      this.addLineItem(bullet, r.text);
    });
    this.addLineBreak();

    //don't always (ever?) need a closer...
    if(RandomHelper.FlipACoin()){
      this.addLine(this.getText('closer'));
      this.addLineBreak();
    }

    this.addLine(this.getText('valediction'));
    this.addText(this.name);
    if(this.physicalAddress && this.physicalAddress.trim() != '')
      this.addSentence('\n' + this.physicalAddress);
  }

  addLineBreak(): void{
    this.addLine('');
  }

  addLine(text: string): void {
    this.letterBody += this.replaceTokens(text) + '\n';
  }

  addLineItem(bullet:string, text: string): void {
    this.letterBody += bullet + ' ' + this.replaceTokens(text) + '\n';
  }

  addSentence(text: string): void{
    this.letterBody += this.replaceTokens(text) + ' ';
  }

  addText(text: string): void{
    this.letterBody += text;
  }

  replaceTokens(text: string): string{
    return text.replace('[projectName]', this.project.name);
  }

  getText(id: string): string{
    return this.dataService.getRandomTextBankEntry(id);
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

  addCustomSupportReason(): void
  {
    this.customSupportReasons.push(new CustomOption());
  }

  addCustomImprovement(): void
  {
    this.customImprovements.push(new CustomOption());
  }

  readyToSendLetter(): boolean{
    if(this.letterSubject && this.letterBody && this.letterSubject.trim() != '' && this.letterBody.trim() != '')
      return true;
    else
      return false;
  }

  sendLetter(): void{
    //todo implement
    console.log('send letter not available yet...')
  }
}
