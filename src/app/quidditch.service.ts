import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { QuidditchTeam } from './models/quidditch-team';
import { publishReplay, refCount, tap, catchError } from 'rxjs/operators';
import { QuidditchMatch } from './models/quidditch-match';

@Injectable({
  providedIn: 'root'
})
export class QuidditchService {
  private quidditchUrl = window["restServer"] + "quidditch/public/";

  private quidditchData$ = this.http.get<QuidditchTeam[]>(this.quidditchUrl + "all")
  .pipe(
    publishReplay(1),
    refCount(),
    tap(_ => console.log('fetched quidditch team list')),
    catchError(this.handleError<QuidditchTeam[]>('getTeams', [])));

  constructor(private http: HttpClient) { }

  getTeams(): Observable<QuidditchTeam[]> {
      return this.quidditchData$;
  }

  getTeamsForLeague(leagueId: number): Observable<QuidditchTeam[]> {
    return this.http.get<QuidditchTeam[]>(this.quidditchUrl + "league?leagueId=" + leagueId)
    .pipe(
      tap(_ => console.log('fetched quidditch teams for league id ' + leagueId)),
      catchError(this.handleError<QuidditchTeam[]>('getTeamsForLeague', [])));
  }

  getTeam(id: number): Observable<QuidditchTeam> {
    return this.http.get<QuidditchTeam>(this.quidditchUrl + "find/" + id)
    .pipe(
      tap(_ => console.log('fetched quidditch team for team id ' + id)),
      catchError(this.handleError<QuidditchTeam>('getTeam', null)));
  }

  getMatches(id: number): Observable<QuidditchMatch[]> {
    return this.http.get<QuidditchMatch[]>(this.quidditchUrl + "history?id=" + id)
    .pipe(
      tap(_ => console.log('fetched quidditch matches for team id ' + id)),
      catchError(this.handleError<QuidditchMatch[]>('getMatches', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
