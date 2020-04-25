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

  private serverDuelistUrl = 'http://localhost:8080/duel/all';
  private serverTeamUrl = 'http://localhost:8080/duel/all_teams';
  private serverMatchHistoryUrl = 'http://localhost:8080/duel/history?id=';

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
