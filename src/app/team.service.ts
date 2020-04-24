import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, publishReplay, refCount } from 'rxjs/operators';

import { Team } from './models/team'

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private individualTeamUrl = "http://localhost:8080/team/individual?id=";

  constructor(private http: HttpClient) { }

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(this.individualTeamUrl + id)
    .pipe(
      tap(_ => console.log('fetched team with id ' + id)),
      catchError(this.handleError<Team>('getTeam', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
