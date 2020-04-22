import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Duelist } from './models/duelist'

@Injectable({
  providedIn: 'root'
})
export class DuelService {

  private serverUrl = 'http://localhost:8080/duel/all';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDuelists(): Observable<Duelist[]> {
    return this.http.get<Duelist[]>(this.serverUrl)
      .pipe(
        tap(_ => console.log('fetched duel list')),
        catchError(this.handleError<Duelist[]>('getDuelists', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
