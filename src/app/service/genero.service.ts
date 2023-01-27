import { GeneroPageInterface, GeneroInterface } from './../model/Genero-interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private entityURL: string = "/genero";
  private url: string = `${environment.baseURL}${this.entityURL}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  plistGenero(page: number, size: number): Observable<GeneroPageInterface> {

    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    const httpOptions = {
      header: new HttpHeaders({
        'Content-Type':'application/json; charset=UTF-8'
      }),
      withCredentials: true,
      params: params
    };

    return this.httpClient.get<GeneroPageInterface>(this.url, httpOptions);
  }

  getOne(id: number): Observable<GeneroInterface> {
    return this.httpClient.get<GeneroInterface>(this.url +"/"+ id);
  }
}
