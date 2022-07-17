import { MEMBERS } from './mock-members';
import { Member } from './member';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,map,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private membersUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //社員データをすべて取得
  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService:社員一覧データを取得しました');
    //this.http.get<Member[]>(this.membersUrl)で成功時は動く
    return this.http.get<Member[]>(this.membersUrl).pipe(
      tap((members) => this.log(`社員データを${members.length}件取得しました`)),
      catchError(this.handleError<Member[]>('getMembers', []))
    );
    //return of(MEMBERS);
  }

  //社員データを一つ取得
  getMember(id:number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap((member) => this.log(`社員データ(id:${id}/name:${member.name})を取得しました`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  //社員データを更新
  updateMember(member: Member): Observable<Member> {
    //変更なのでput
    //引数３つとる
    return this.http.put(this.membersUrl, member, this.httpOptions).pipe(
      tap(_ => this.log(`社員データ(${member.id})を更新しました`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  //社員データを追加
  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member, this.httpOptions).pipe(
      tap((newMember: Member) => this.log(`社員データ(${newMember.id})を追加しました`)),
      catchError(this.handleError<Member>('addMember'))
    );
  }

  //社員データを削除
  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.membersUrl}/${id}`;
    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`社員データ(${id})を削除しました`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }

  //社員データを検索
  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`社員データを検索しました: ${term}`)),
      catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }

  //ログを追加
  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  //エラーログを追加
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} 失敗: ${error.message}`);
      return of(result as T);
    }
  }
}
