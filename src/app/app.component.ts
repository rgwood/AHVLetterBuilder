import { Component } from '@angular/core';

export class Project {
  id: number;
  name: string;
  description: string;
  isRental: boolean; //todo: use tags?
}

export class Reason {
  id: string;
  description: string;
  appliesToUser: boolean=false; //do default property values even work in TS? Still need to specify false below...
  tags: string[]; 
}

const RELATIONSHIPREASONS: Reason[] = [
{id:'liveNearby', description:'I currently live nearby', appliesToUser:false, tags:[]},
{id:'wantLiveNearby', description:'I would like to live nearby', appliesToUser:false, tags:[]},
{id:'workNearby', description:'I work nearby', appliesToUser:false, tags:[]},
{id:'grewUpNearby', description:'I grew up nearby', appliesToUser:false, tags:[]},
{id:'friendsNearby', description:'I have friends that live nearby', appliesToUser:false, tags:[]},
{id:'familyNearby', description:'I have family that live nearby', appliesToUser:false, tags:[]}
];

const SUPPORTREASONS: Reason[] = [
{id:'stayInArea', description:'I want to stay in the neighbourhood', appliesToUser:false, tags:[]},
{id:'moveToArea', description:'I want to move to this neighbourhood', appliesToUser:false, tags:[]},
{id:'rentalSupport', description:'I want more rental homes in Vancouver', appliesToUser:false, tags:['rental']},
{id:'friendsFamilySupport', description:'I want my friends and family to be able to live in this neighbourhood', appliesToUser:false, tags:[]},
{id:'vibrantSupport', description:'This project will make the neighbourhood more vibrant', appliesToUser:false, tags:[]},
{id:'retailSupport', description:'I want more shops in the neighbourhood', appliesToUser:false, tags:[]},
{id:'centralSupport', description:'I want more homes in central, walkable neighbourhoods', appliesToUser:false, tags:[]},
{id:'transitSupport', description:'I want more homes with good access to transit', appliesToUser:false, tags:[]},
];

const IMPROVEREASONS: Reason[] = [
{id:'moreHomes', description:'The project could have more homes', appliesToUser:false, tags:[]},
{id:'moreFamilyHomes', description:'The project could have more family-friendly homes', appliesToUser:false, tags:[]},
{id:'noRezoning', description:'The project should have been allowed without a rezoning', appliesToUser:false, tags:[]},
{id:'', description:'', appliesToUser:false, tags:[]},
{id:'', description:'', appliesToUser:false, tags:[]},
{id:'', description:'', appliesToUser:false, tags:[]},
];

const PROJECTS: Project[] = [
  { id: 15, name: '228 E 7th Ave' , description:'Great project. Much housing', isRental:true},
  { id: 17, name: 'Dynama'  , description:'Great project. ', isRental:true},
  { id: 18, name: 'Dr IQ'   , description:'Great project. ', isRental:true},
  { id: 19, name: 'Magma'   , description:'Great project. ', isRental:true},
  { id: 20, name: 'Tornado' , description:'Great project. ', isRental:true}
];

@Component({
  selector: 'app-root',
  template: `
    <h1>{{project.name}}</h1>
    <h2>{{project.description}}</h2>
    <div>
    <input [(ngModel)]="name" placeholder="Full Name"/>
    </div>
    <div>
    <input [(ngModel)]="emailAddress" placeholder="Email Address"/>
    </div>
    <div>
       Your relationship to the area:
    </div>
    <div>
    <li *ngFor="let reason of relationshipReasons">
       <input type="checkbox" [(ngModel)]="reason.appliesToUser"/>{{reason.description}}
    </li>
    </div>

    <div>
       Why do you support this project?
    </div>
    <div>
    <li *ngFor="let reason of supportReasons">
       <input type="checkbox"/>{{reason.description}}
    </li>
    </div>

    <div>
       What do you think could be improved?
    </div>
    <div>
    <li *ngFor="let reason of improveReasons">
       <input type="checkbox"/>{{reason.description}}
    </li>
    </div>

    <button (click)="generateText()">Generate Text</button>
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})
export class AppComponent {
  title = 'AHV Letter Builder';
  relationshipReasons = RELATIONSHIPREASONS;
  supportReasons = SUPPORTREASONS;
  improveReasons = IMPROVEREASONS;
  name : string;
  emailAddress : string;
  
  project = PROJECTS.filter(function(p) { return p.id === 15; })[0];//todo: get project ID from URL or something

  generateText(): void {
    this.relationshipReasons.filter(function(r){return r.appliesToUser}).forEach(element => {
      alert(element.description);
    });
  }
}
