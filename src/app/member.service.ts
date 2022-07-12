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

  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService:社員一覧データを取得しました');
    return this.http.get<Member[]>(this.membersUrl).pipe(
      tap(members => this.log(`社員データを${members.length}件取得しました`)),
      catchError(this.handleError<Member[]>('getMembers', []))
    );
  }

  getMember(id:number): Observable<Member> {
    this.messageService.add(`MemberService:社員一覧データ(${id})を取得しました`);
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => this.log(`社員データ(${id})を取得しました`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    )
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions).pipe(
      tap(_ => this.log(`社員データ(${member.id})を更新しました`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member, this.httpOptions).pipe(
      tap((newMember: Member) => this.log(`社員データ(${newMember.id})を追加しました`)),
      catchError(this.handleError<Member>('addMember'))
    );
  }

  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.membersUrl}/${id}`;
    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap(_ => this.log(`社員データ(${id})を削除しました`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }

  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`社員データを検索しました: ${term}`)),
      catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} 失敗: ${error.message}`);

      return of(result as T);
    }
  }
}
