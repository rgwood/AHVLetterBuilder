import { Component } from '@angular/core';
import { Project } from './project';
import { Option } from './option';
import { CustomOption } from './option';
import { OptionType } from './option';
import { DataService } from './data.service';
import { RandomHelper } from './random-helper';
import { OnInit } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './letter-builder.component.html',
  providers: [DataService]
})

export class LetterBuilderComponent {
  constructor(private dataService: DataService) { }
  project: Project
  relationships: Option[]
  customRelationship: string
  supportReasons: Option[]
  customSupportReasons: CustomOption[]
  improvements: Option[]
  customImprovements: CustomOption[]
  name: string = '';
  emailAddress: string ='';
  physicalAddress: string = '';
  letterSubject: string = '';
  letterBody: string = '';
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.dataService.init(() => {
      var projectId = this.getQueryParams(location.search)['p'];
      var proj = this.dataService.getProject(projectId);
      if(proj == null)
        this.project = new Project('404', '404', '404','Project not found',[]);
      else
        this.project = this.dataService.getProject(projectId);

      this.relationships = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Relationship));
      this.supportReasons = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.SupportReason));
      this.customSupportReasons = [];
      this.improvements = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Improvement));
      this.customImprovements = [];
      this.dataLoaded = true;
      if(this.getQueryParams(location.search)['test'] == 'true')
        this.populateTestData();
    });
  }

  //make testing easier by prepopulating most fields with (nonsense) data
  populateTestData(): void {
    this.name = "Test McTesterson";
    this.emailAddress = "test@test.com"
    this.physicalAddress = "4567 Fake Street, Vancouver. V5T 0A1"
    for(let i = 0; i < 1; i++){
      this.relationships[RandomHelper.RandomIntInclusive(0,this.relationships.length - 1)].appliesToUser = true;
    }
    //this.customRelationship = "I also have a very custom relationship to this project.";

    for(let i = 0; i < 2; i++){
      this.supportReasons[RandomHelper.RandomIntInclusive(0,this.supportReasons.length - 1)].appliesToUser = true;
    }
    //this.customSupportReasons.push(new CustomOption('This project is good for custom reasons'));

    for(let i = 0; i < 2; i++){
      this.improvements[RandomHelper.RandomIntInclusive(0,this.improvements.length - 1)].appliesToUser = true;
    }
    //this.customImprovements.push(new CustomOption("I'd like to see some custom cool things in the building"));
  }

  generateText(): void {
    let bullet = this.dataService.getRandomBulletPoint();

    this.letterSubject = this.getTextFromBank('emailSubject');
    this.letterBody = '';
    this.addLine(this.getTextFromBank('firstLine'));
    this.addLineBreak();
    this.addSentence(this.getTextFromBank('openingSentence'));

    this.relationships.filter(function (r) { return r.appliesToUser; }).forEach(element => {
      this.addSentence(this.getTextFromBank(element.id));
    });
    if(this.customRelationship && this.customRelationship.trim() != '')
      this.addSentence(this.customRelationship);
    this.addLineBreak();
    this.addLineBreak();

    let applicableStandardSupportReasons = this.supportReasons.filter(function (r) { return r.appliesToUser; });
    if(applicableStandardSupportReasons.length > 0 || this.customSupportReasons.length > 0){
      this.addSentence(this.getTextFromBank('supportReasonIntroStart'));
      this.addLine(this.getTextFromBank('supportReasonIntroEnd'));
      applicableStandardSupportReasons.forEach(element => {
        this.addLineItem(bullet, this.getTextFromBank(element.id));
      });
      this.customSupportReasons.forEach( r => {
        this.addLineItem(bullet, r.text);
      });
      this.addLineBreak();
    }

    let applicableImprovementSuggestions = this.improvements.filter(function (r) { return r.appliesToUser; });
    if(applicableImprovementSuggestions.length > 0 || this.customImprovements.length > 0){
      this.addLine(this.getTextFromBank('improvementIntro'));
      applicableImprovementSuggestions.forEach(element => {
        this.addLineItem(bullet, this.getTextFromBank(element.id));
      });
      this.customImprovements.forEach( r => {
        this.addLineItem(bullet, r.text);
      });
      this.addLineBreak();
    }

    //don't always (ever?) need a closer...
    if(RandomHelper.FlipACoin()){
      this.addLine(this.getTextFromBank('closer'));
      this.addLineBreak();
    }

    this.addLine(this.getTextFromBank('valediction'));
    this.addText(this.name);
    if(this.physicalAddress && this.physicalAddress.trim() != '')
      this.addSentence('\n' + this.physicalAddress);
  }

  addLineBreak(): void{
    this.addLine('');
  }

  addLine(text: string): void {
    this.letterBody += text + '\n';
  }

  addLineItem(bullet:string, text: string): void {
    this.letterBody += bullet + ' ' + text + '\n';
  }

  addSentence(text: string): void{
    this.letterBody += text + ' ';
  }

  addText(text: string): void{
    this.letterBody += text;
  }

  replaceTokens(text: string): string{
    return text.replace('[projectName]', this.project.name)
               .replace('[neighbourhoodName]',this.project.neighbourhood);
  }

  getTextFromBank(id: string): string{
    return this.replaceTokens(this.dataService.getRandomTextBankEntry(id));
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
    this.customSupportReasons.push(new CustomOption(''));
  }

  addCustomImprovement(): void
  {
    this.customImprovements.push(new CustomOption(''));
  }

  //is there text that might be overwritten if the user generates a new letter? 
  warnAboutOverwrite(): boolean{
    return this.letterBody.trim() != '';
  }

  readyToSendLetter(): boolean{
    if(this.letterSubject && this.letterBody && this.letterSubject.trim() != '' && this.letterBody.trim() != '')
      return true;
    else
      return false;
  }

  sendLetter(): void{
    console.log('send letter not available yet...')
  }
}
