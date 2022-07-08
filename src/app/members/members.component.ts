import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members!: Member[];

  selectedMember!: Member;

  constructor(
    private memberService: MemberService,
    public MessageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getMembers();
    console.log(this.selectedMember);
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
    console.log(this.selectedMember);
    this.MessageService.add(`MembersComponent:社員データ(id=${member.id})が選択されました`)
  }

  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }
}
