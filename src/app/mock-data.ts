import { Project } from './project';
import { Personalization } from './personalization';
import { PersonalizationType } from './personalization';

export const PERSONALIZATIONS: Personalization[] = [
{type: PersonalizationType.Relationship, id:'wantLiveNearby', description:'I would like to live in the neighbourhood', appliesToUser:false, tags:[]},
{type: PersonalizationType.Relationship, id:'liveNearby', description:'I currently live nearby', appliesToUser:false, tags:[]},
{type: PersonalizationType.Relationship, id:'workNearby', description:'I work nearby', appliesToUser:false, tags:[]},
{type: PersonalizationType.Relationship, id:'grewUpNearby', description:'I grew up nearby', appliesToUser:false, tags:[]},
{type: PersonalizationType.Relationship, id:'friendsNearby', description:'I have friends that live nearby', appliesToUser:false, tags:[]},
{type: PersonalizationType.Relationship, id:'familyNearby', description:'I have family that live nearby', appliesToUser:false, tags:[]},
{type: PersonalizationType.SupportReason, id: 'stayInArea', description:'I want to stay in the neighbourhood', appliesToUser:false, tags:[]},
{type: PersonalizationType.SupportReason, id: 'moveToArea', description:'I want to move to this neighbourhood', appliesToUser:false, tags:[]},
{type: PersonalizationType.SupportReason, id: 'rentalSupport', description:'I want more rental homes in Vancouver', appliesToUser:false, tags:['RENTAL']},
{type: PersonalizationType.SupportReason, id: 'friendsFamilySupport', description:'I want my friends and family to be able to live in this neighbourhood', appliesToUser:false, tags:[]},
{type: PersonalizationType.SupportReason, id: 'vibrantSupport', description:'This project will make the neighbourhood more vibrant', appliesToUser:false, tags:[]},
{type: PersonalizationType.SupportReason, id: 'retailSupport', description:'I want more shops in the neighbourhood', appliesToUser:false, tags:[]},
{type: PersonalizationType.SupportReason, id: 'centralSupport', description:'I want more homes in central, walkable neighbourhoods', appliesToUser:false, tags:[]},
{type: PersonalizationType.SupportReason, id: 'transitSupport', description:'I want more homes with good access to transit', appliesToUser:false, tags:[]},
{type: PersonalizationType.ImproveSuggestion, id: 'moreHomes', description:'The project could have more homes', appliesToUser:false, tags:[]},
{type: PersonalizationType.ImproveSuggestion, id: 'moreFamilyHomes', description:'The project could have more family-friendly homes', appliesToUser:false, tags:[]},
{type: PersonalizationType.ImproveSuggestion, id: 'noRezoning', description:'The project should have been allowed without a rezoning', appliesToUser:false, tags:[]},
];

export const PROJECTS: Project[] = [
  { id: 1,  name: 'Project not found', description: '', tags:[]},
  { id: 15, name: '228 E 7th Ave' , description: 'Great project. Much housing', tags:['RENTAL']},
  { id: 17, name: 'Dynama'  , description: 'Great project. ', tags:[]},
  { id: 18, name: 'Dr IQ'   , description: 'Great project. ', tags:[]},
  { id: 19, name: 'Magma'   , description: 'Great project. ', tags:[]},
  { id: 20, name: 'Tornado' , description: 'Great project. ', tags:[]}
];
