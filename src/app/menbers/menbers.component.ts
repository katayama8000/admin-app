import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
@Component({
  selector: 'app-menbers',
  templateUrl: './menbers.component.html',
  styleUrls: ['./menbers.component.css'],
})
export class MenbersComponent implements OnInit {
  members!: Member[];

  selectedMember!: Member;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
  }

  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }
}
