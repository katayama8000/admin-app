import { MEMBERS } from './mock-members';
import { Member } from './member';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private messageService: MessageService) {}

  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService:社員一覧データを取得しました');
    return of(MEMBERS);
  }

  getMember(id:number): Observable<Member> {
    this.messageService.add(`MemberService:社員一覧データ(${id})を取得しました`);
    return of(MEMBERS.find(member => member.id === id));
  }
}
