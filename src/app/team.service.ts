import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Team } from './models/team'

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private individualTeamUrl = window["restServer"] + "team/public/";

  constructor(private http: HttpClient) { }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(this.individualTeamUrl + "find/" + id)
    .pipe(
      tap(_ => console.log('fetched team with id ' + id)),
      catchError(this.handleError<Team>('getTeam', null)));
  }

  getTeamsForPlayer(id: number): Observable<{[type: string]: Team}> {
    return this.http.get<{[type: string]: Team}>(this.individualTeamUrl + "player/" + id)
    .pipe(
      tap(_ => console.log('fetched teams for player id ' + id)),
      catchError(this.handleError<{[type: string]: Team}>('getTeamForPlayer', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
