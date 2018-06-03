import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project';
import { Option } from './option';
import { CustomOption } from './option';
import { OptionType } from './option';
import { DataService } from './data.service';
import { RandomHelper } from './random-helper';
import { OnInit } from '@angular/core';
import { ModalComponent } from './modal.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './letter-builder.component.html',
  styleUrls: ['./letter-builder.component.css'],
  providers: [DataService]
})

export class LetterBuilderComponent {
  projectId: string = '';
  project: Project;
  relationships: Option[];
  customRelationship: string;
  recommendations: Option[];
  supportReasons: Option[];
  customSupportReasons: CustomOption[];
  improvements: Option[];
  customImprovements: CustomOption[];
  name: string = '';
  emailAddress: string = '';
  physicalAddress: string = '';
  letterSubject: string = '';
  letterBody: string = '';
  joinMailingList: boolean = false;
  dataLoaded: boolean = false;
  letterSent: boolean = false;
  demoMode: boolean = false;
  projectNotFound: boolean = false;
  staticEmail: boolean = false;

  // text for display
  sendLetterButtonText: string = 'Send Letter';
  messageSentModalDialogHeader: string = '';
  messageSentModalDialogBody = '';

  constructor(private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {

    const defaultProjectId = 'qboro-tmh';

    this.dataService.init(() => {
      const projectId = this.getQueryParams(location.search)['p'];
      this.projectId = projectId;
      let proj = this.dataService.getProject(projectId);
      if (proj == null) {
        // try the default one.
        proj = this.dataService.getProject(defaultProjectId);
      }
      if (proj == null) {
        this.projectNotFound = true;
      }

      if (!this.projectNotFound) {
        this.project = proj;
        this.relationships = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Relationship));
        this.supportReasons = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.SupportReason));
        this.recommendations = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Recommendation));
        this.customSupportReasons = [];
        this.improvements = this.getApplicableOptionsForProject(this.project, this.dataService.getOptions(OptionType.Improvement));
        this.customImprovements = [];
        this.staticEmail = this.project.fullEmail.length !== 0
      }
      this.dataLoaded = true;
      });
  }

  // make testing easier by prepopulating most fields with (nonsense) data
  populateTestData(): void {
    this.name = 'Test McTesterson';
    this.emailAddress = 'test@test.com';
    this.physicalAddress = '4567 Fake Street, Vancouver. V5T 0A1';
    for (let i = 0; i < 1; i++) {
      this.relationships[RandomHelper.RandomIntInclusive(0, this.relationships.length - 1)].appliesToUser = true;
    }

    for (let i = 0; i < 2; i++) {
      this.supportReasons[RandomHelper.RandomIntInclusive(0, this.supportReasons.length - 1)].appliesToUser = true;
    }

    for (let i = 0; i < 2; i++) {
      this.improvements[RandomHelper.RandomIntInclusive(0, this.improvements.length - 1)].appliesToUser = true;
    }
  }

  generateText(): void {
    const bullet = this.dataService.getRandomBulletPoint();

    this.letterSubject = this.getTextFromBank('emailSubject');
    this.letterBody = '';
    this.addLine(this.getTextFromBank('firstLine'));
    this.addLineBreak();
    this.addSentence(this.getTextFromBank('openingSentence'));

    if (this.staticEmail) {
      this.addLineBreak();
      this.addLineBreak();
      this.addText(this.project.fullEmail);
      this.addLineBreak();
    } else {

      this.relationships.filter(function (r) { return r.appliesToUser; }).forEach(element => {
        this.addSentence(this.getTextFromBank(element.id));
      });
      if (this.customRelationship && this.customRelationship.trim() !== '') {
        this.addSentence(this.customRelationship);
      }
      this.addLineBreak();
      this.addLineBreak();

      let applicableStandardRecommendations = this.recommendations.filter(function (r) { return r.appliesToUser; });
      if (applicableStandardRecommendations.length > 0) {
        if (applicableStandardRecommendations.length == 1) {
          this.addLine(this.getTextFromBank('recommendationIntroSingle'));
        }
        else
        {
          this.addLine(this.getTextFromBank('recommendationIntroMultiple'));
        }
        applicableStandardRecommendations.forEach(r => {
          this.addLineItem(bullet, this.getTextFromBank(r.id));
        });
        this.addLineBreak();
      }

      let applicableStandardSupportReasons = this.supportReasons.filter(function (r) { return r.appliesToUser; });
      if(applicableStandardSupportReasons.length > 0 || this.customSupportReasons.length > 0){
        this.addSentence(this.getTextFromBank('supportReasonIntroStart'));
        this.addLine(this.getTextFromBank('supportReasonIntroEnd'));
        applicableStandardSupportReasons.forEach(element => {
          this.addLineItem(bullet, this.getTextFromBank(element.id));
        });
        this.customSupportReasons.forEach(r => {
          this.addLineItem(bullet, r.text);
        });
        this.addLineBreak();
      }

      const applicableImprovementSuggestions = this.improvements.filter(function (r) { return r.appliesToUser; });
      if (applicableImprovementSuggestions.length > 0 || this.customImprovements.length > 0) {
        this.addLine(this.getTextFromBank('improvementIntro'));
        applicableImprovementSuggestions.forEach(element => {
          this.addLineItem(bullet, this.getTextFromBank(element.id));
        });
        this.customImprovements.forEach(r => {
          this.addLineItem(bullet, r.text);
        });
        this.addLineBreak();
      }
    }

    // don't always (ever?) need a closer...
    if (RandomHelper.FlipACoin()) {
      this.addLine(this.getTextFromBank('closer'));
      this.addLineBreak();
    }

    this.addLine(this.getTextFromBank('valediction'));
    this.addText(this.name);
    if (this.physicalAddress && this.physicalAddress.trim() !== '') {
      this.addSentence('\n' + this.physicalAddress);
    }
  }

  addLineBreak(): void {
    this.addLine('');
  }

  addLine(text: string): void {
    this.letterBody += text + '\n';
  }

  addLineItem(bullet: string, text: string): void {
    this.letterBody += bullet + ' ' + text + '\n';
  }

  addSentence(text: string): void {
    this.letterBody += text + ' ';
  }

  addText(text: string): void {
    this.letterBody += text;
  }

  replaceTokens(text: string): string {
    return text.replace('[projectName]', this.project.name)
               .replace('[address]', this.project.address)
               .replace('[neighbourhoodName]', this.project.neighbourhood);
  }

  getTextFromBank(id: string): string {
    return this.replaceTokens(this.dataService.getRandomTextBankEntry(id));
  }

  getApplicableOptionsForProject(project: Project, allOptions: Option[]): Option[] {
    let ret = allOptions.filter(function (r) { return r.tags.length === 0; });
    project.tags.forEach(tag => {
      const tagMatches = allOptions.filter(function (r) { return r.tags.includes(tag); });
      ret = ret.concat(tagMatches);
    });
    return ret;
  }

  getQueryParams(qs: string): {} {
    // polyfill for IE
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

          // 1. Let O be ? ToObject(this value).
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          const o = Object(this);

          // 2. Let len be ? ToLength(? Get(O, "length")).
          const len = o.length >>> 0;

          // 3. If len is 0, return false.
          if (len === 0) {
            return false;
          }

          // 4. Let n be ? ToInteger(fromIndex).
          //    (If fromIndex is undefined, this step produces the value 0.)
          const n = fromIndex | 0;

          // 5. If n ≥ 0, then
          //  a. Let k be n.
          // 6. Else n < 0,
          //  a. Let k be len + n.
          //  b. If k < 0, let k be 0.
          let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

          function sameValueZero(x, y) {
            return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
          }

          // 7. Repeat, while k < len
          while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            // c. Increase k by 1.
            if (sameValueZero(o[k], searchElement)) {
              return true;
            }
            k++;
          }

          // 8. Return false
          return false;
        }
      });
    }

    qs = qs.split('+').join(' ');

    let params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  }

  addCustomSupportReason(): void {
    this.customSupportReasons.push(new CustomOption(''));
  }

  addCustomImprovement(): void {
    this.customImprovements.push(new CustomOption(''));
  }

  // is there text that might be overwritten if the user generates a new letter?
  warnAboutOverwrite(): boolean {
    return this.letterBody.trim() !== '';
  }

  readyToSendLetter(): boolean {
    if (!this.letterSent && this.letterSubject && this.letterBody && this.letterSubject.trim() !== '' && this.letterBody.trim() !== '') {
      return true;
    }
    else {
      return false;
    }
  }

  sendLetter(): void {

    this.messageSentModalDialogHeader = 'Sending...';
    const url = environment.submitUrl;

    const data = {};
    data['projectId'] = this.project.id;
    data['name'] = this.name;
    data['email'] = this.emailAddress;
    data['subject'] = this.letterSubject;
    data['content'] = this.letterBody;
    data['join'] = this.joinMailingList;
    data['recipients'] = this.project.emailToAddresses;

    if (this.demoMode) {
      this.sendLetterSucceeded()
    } else {
      console.log('Posting letter');
      this.http.post(url, data)
      .subscribe(() => { },
        err => { console.log(err); this.sendLetterFailed(); },
        () => this.sendLetterSucceeded());
    }
  }

  sendLetterSucceeded(): void {
    console.log('Post complete');
    this.letterSent = true;
    this.sendLetterButtonText = 'Letter sent';
    this.messageSentModalDialogHeader = 'All Done';
    this.messageSentModalDialogBody = 'Your letter has been added to the review queue and will be sent to council shortly. Thank you so much!';
  }

  sendLetterFailed(): void {
    console.log('Message failed to send');
    this.messageSentModalDialogHeader = 'Message failed to send';
    this.messageSentModalDialogBody = 'The message failed to send, sorry about that! Try again, and if it still doesn\'t work please let us know.';
  }
}
