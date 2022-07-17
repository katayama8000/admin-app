import { MemberService } from './../member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from './../member';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @Input() member!: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService
      .getMember(id)
      .subscribe((member) => (this.member = member));
  }

  goback(): void {
    this.location.back();
  }

  save(): void {
    //レスポンスが帰ってきたらひとつ前に戻る
    this.memberService.updateMember(this.member).subscribe(() => this.goback());
  }
}
