import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, publishReplay, refCount } from 'rxjs/operators';

import { Duelist } from './models/duelist'
import { Team } from './models/team'
import { DuelMatch } from './models/duel-match';

@Injectable({
  providedIn: 'root'
})
export class DuelService {

  private baseUrl = window["restServer"];
  private serverDuelistUrl = this.baseUrl + 'duel/public/all';
  private serverTeamUrl = this.baseUrl + 'duel/public/all_teams';
  private serverDuelistByIdUrl = this.baseUrl + 'duel/public/find/'
  private serverMatchHistoryUrl = this.baseUrl + 'duel/public/history?id=';

  private duelistData$: Observable<Duelist[]>;
  private teamData$: Observable<Team[]>;
  
  constructor(private http: HttpClient) { 
    this.duelistData$ = this.http.get<Duelist[]>(this.serverDuelistUrl)
      .pipe(
        publishReplay(1),
        refCount(),
        tap(_ => console.log('fetched duel player list')),
        catchError(this.handleError<Duelist[]>('getDuelists', [])));

    this.teamData$ = this.http.get<Team[]>(this.serverTeamUrl)
      .pipe(
        publishReplay(1),
        refCount(),
        tap(_ => console.log('fetched duel team list')),
        catchError(this.handleError<Team[]>('getTeam', [])));
  }

  getDuelists(): Observable<Duelist[]> {
    return this.duelistData$;
  }

  getDuelist(id: number): Observable<Duelist> {
    return this.http.get<Duelist>(this.serverDuelistByIdUrl + id)
    .pipe(
      tap(_ => console.log('fetched individual with id ' + id)),
      catchError(this.handleError<Duelist>('getDuelist', null)));
  }

  getTeams(): Observable<Team[]> {
    return this.teamData$;
  }

  getMatchHistory(id: number, winsOnly: boolean): Observable<DuelMatch[]> {
    return this.http.get<DuelMatch[]>(this.serverMatchHistoryUrl + id + "&winsOnly=" + winsOnly)
      .pipe(
        tap(_ => console.log('fetched duel match list for ' + id)),
        catchError(this.handleError<DuelMatch[]>('getMatchHistory', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
