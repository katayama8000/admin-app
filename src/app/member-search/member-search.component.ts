import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {

  members$: Observable<Member[]>;

  //observableを継承したクラス
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberService) {}

  search(term: string): void {
    console.log(term)
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(

      //短時間で連打されたときにデータが流れるのを防ぐ
      debounceTime(300),

      //データが同じなら流れない
      distinctUntilChanged(),

      //受け取ったデータを別のストリームに流す
      //新しいデータが流れてきたら、今のストリームを破棄する
      switchMap((term: string) => this.memberService.searchMembers(term))
    )
  }
}
