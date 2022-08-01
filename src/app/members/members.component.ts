import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[] = [];

  //初期化関数
  constructor(
    protected memberService: MemberService,
    protected messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getMembers();
    console.log(this);
  }

  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.memberService
      .addMember({ name } as Member)
      .subscribe((member) => this.members.push(member));
  }

  delete(member: Member): void {
    //引数以外を抽出
    this.members = this.members.filter((m) => m !== member);
    this.memberService.deleteMember(member).subscribe();
  }
}

//MembersComponentを継承test

class NewComponent extends MembersComponent {
  constructor(
    protected memberService: MemberService,
    protected messageService: MessageService
  ) {
    super(memberService, messageService);
  }
}
