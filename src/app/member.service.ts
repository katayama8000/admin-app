import { MEMBERS } from './mock-members';
import { Member } from './member';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  getMembers(): Member[]{
    return MEMBERS
  }
}
