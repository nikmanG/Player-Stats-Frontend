import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, publishReplay, refCount } from 'rxjs/operators';

import { Duelist } from './models/duelist'
import { Team } from './models/team'

@Injectable({
  providedIn: 'root'
})
export class DuelService {

  private serverDuelistUrl = 'http://localhost:8080/duel/all';
  private serverTeamUrl = 'http://localhost:8080/duel/all_teams';

  private duelistData$: Observable<Duelist[]>;
  private teamData$: Observable<Team[]>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
