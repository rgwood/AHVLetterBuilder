"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Project = (function () {
    function Project() {
    }
    return Project;
}());
exports.Project = Project;
var Reason = (function () {
    function Reason() {
        this.appliesToUser = false; //do default property values even work in TS? Still need to specify false below...
    }
    return Reason;
}());
exports.Reason = Reason;
var RELATIONSHIPREASONS = [
    { id: 'liveNearby', description: 'I currently live nearby', appliesToUser: false, tags: [] },
    { id: 'wantLiveNearby', description: 'I would like to live nearby', appliesToUser: false, tags: [] },
    { id: 'workNearby', description: 'I work nearby', appliesToUser: false, tags: [] },
    { id: 'grewUpNearby', description: 'I grew up nearby', appliesToUser: false, tags: [] },
    { id: 'friendsNearby', description: 'I have friends that live nearby', appliesToUser: false, tags: [] },
    { id: 'familyNearby', description: 'I have family that live nearby', appliesToUser: false, tags: [] }
];
var SUPPORTREASONS = [
    { id: 'stayInArea', description: 'I want to stay in the neighbourhood', appliesToUser: false, tags: [] },
    { id: 'moveToArea', description: 'I want to move to this neighbourhood', appliesToUser: false, tags: [] },
    { id: 'rentalSupport', description: 'I want more rental homes in Vancouver', appliesToUser: false, tags: ['rental'] },
    { id: 'friendsFamilySupport', description: 'I want my friends and family to be able to live in this neighbourhood', appliesToUser: false, tags: [] },
    { id: 'vibrantSupport', description: 'This project will make the neighbourhood more vibrant', appliesToUser: false, tags: [] },
    { id: 'retailSupport', description: 'I want more shops in the neighbourhood', appliesToUser: false, tags: [] },
    { id: 'centralSupport', description: 'I want more homes in central, walkable neighbourhoods', appliesToUser: false, tags: [] },
    { id: 'transitSupport', description: 'I want more homes with good access to transit', appliesToUser: false, tags: [] },
];
var IMPROVEREASONS = [
    { id: 'moreHomes', description: 'The project could have more homes', appliesToUser: false, tags: [] },
    { id: 'moreFamilyHomes', description: 'The project could have more family-friendly homes', appliesToUser: false, tags: [] },
    { id: 'noRezoning', description: 'The project should have been allowed without a rezoning', appliesToUser: false, tags: [] },
    { id: '', description: '', appliesToUser: false, tags: [] },
    { id: '', description: '', appliesToUser: false, tags: [] },
    { id: '', description: '', appliesToUser: false, tags: [] },
];
var PROJECTS = [
    { id: 15, name: '228 E 7th Ave', description: 'Great project. Much housing', isRental: true },
    { id: 17, name: 'Dynama', description: 'Great project. ', isRental: true },
    { id: 18, name: 'Dr IQ', description: 'Great project. ', isRental: true },
    { id: 19, name: 'Magma', description: 'Great project. ', isRental: true },
    { id: 20, name: 'Tornado', description: 'Great project. ', isRental: true }
];
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'AHV Letter Builder';
        this.relationshipReasons = RELATIONSHIPREASONS;
        this.supportReasons = SUPPORTREASONS;
        this.improveReasons = IMPROVEREASONS;
        this.project = PROJECTS.filter(function (p) { return p.id === 15; })[0]; //todo: get project ID from URL or something
    }
    AppComponent.prototype.generateText = function () {
        this.relationshipReasons.filter(function (r) { return r.appliesToUser; }).forEach(function (element) {
            alert(element.description);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <h1>{{project.name}}</h1>\n    <h2>{{project.description}}</h2>\n    <div>\n    <input [(ngModel)]=\"name\" placeholder=\"Full Name\"/>\n    </div>\n    <div>\n    <input [(ngModel)]=\"emailAddress\" placeholder=\"Email Address\"/>\n    </div>\n    <div>\n       Your relationship to the area:\n    </div>\n    <div>\n    <li *ngFor=\"let reason of relationshipReasons\">\n       <input type=\"checkbox\" [(ngModel)]=\"reason.appliesToUser\"/>{{reason.description}}\n    </li>\n    </div>\n\n    <div>\n       Why do you support this project?\n    </div>\n    <div>\n    <li *ngFor=\"let reason of supportReasons\">\n       <input type=\"checkbox\"/>{{reason.description}}\n    </li>\n    </div>\n\n    <div>\n       What do you think could be improved?\n    </div>\n    <div>\n    <li *ngFor=\"let reason of improveReasons\">\n       <input type=\"checkbox\"/>{{reason.description}}\n    </li>\n    </div>\n\n    <button (click)=\"generateText()\">Generate Text</button>\n  ",
        styles: ["\n    .selected {\n      background-color: #CFD8DC !important;\n      color: white;\n    }\n    .heroes {\n      margin: 0 0 2em 0;\n      list-style-type: none;\n      padding: 0;\n      width: 15em;\n    }\n    .heroes li {\n      cursor: pointer;\n      position: relative;\n      left: 0;\n      background-color: #EEE;\n      margin: .5em;\n      padding: .3em 0;\n      height: 1.6em;\n      border-radius: 4px;\n    }\n    .heroes li.selected:hover {\n      background-color: #BBD8DC !important;\n      color: white;\n    }\n    .heroes li:hover {\n      color: #607D8B;\n      background-color: #DDD;\n      left: .1em;\n    }\n    .heroes .text {\n      position: relative;\n      top: -3px;\n    }\n    .heroes .badge {\n      display: inline-block;\n      font-size: small;\n      color: white;\n      padding: 0.8em 0.7em 0 0.7em;\n      background-color: #607D8B;\n      line-height: 1em;\n      position: relative;\n      left: -1px;\n      top: -4px;\n      height: 1.8em;\n      margin-right: .8em;\n      border-radius: 4px 0 0 4px;\n    }\n  "]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map