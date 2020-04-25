import { Injectable } from '@angular/core';
import { Player } from './models/player';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerUrl = "http://localhost:8080/player/find/";

  constructor(private http: HttpClient) { }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(this.playerUrl + id)
    .pipe(
      tap(_ => console.log('fetched player with id ' + id)),
      catchError(this.handleError<Player>('getPlayer', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
