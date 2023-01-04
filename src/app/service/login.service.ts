import { UsuarioInterface } from './../model/Usuario-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

//import * as bcrypt from 'bcryptjs';
import { Observable, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private entityURL = '/login';
  url: string = `${environment.baseURL}${this.entityURL}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    }),
    withCredentials: true
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  login(login: string, password: string): Observable<UsuarioInterface> {
    const loginData = JSON.stringify({ login: login, password: password });

    return this.httpClient.post<UsuarioInterface>(this.url, loginData, this.httpOptions).pipe(
      tap((u: UsuarioInterface) => console.log("session.service login HTTP request executed", u)),
      retry(1)
    );
  }

  logout(): Observable<String> {
    return this.httpClient.delete<String>(this.url, this.httpOptions);
  }

  check(): Observable<String> {
    return this.httpClient.get<String>(this.url, this.httpOptions);
  }
}
