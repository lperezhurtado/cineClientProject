import { GeneroPageInterface, GeneroInterface, GeneroNewInterface } from './../model/Genero-interface';
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

  plistGenero(page: number, size: number, filter: string, strSortField:string, strOrderDirection:string): Observable<GeneroPageInterface> {

    let params = new HttpParams()
    .set("filter", filter)
    .set("page", page)
    .set("size", size);

    if (strSortField != "") {
      if (strOrderDirection != "") {
        params = params.set("sort", strSortField+","+strOrderDirection);
      } else {
        params = params.set("sort", strSortField);
      }
    }

    const httpOptions = {
      header: new HttpHeaders({
        'Content-Type':'application/json; charset=UTF-8'
      }),
      withCredentials: true,
      params: params
    };

    return this.httpClient.get<GeneroPageInterface>(this.url, httpOptions);
  }

  createGenero(genero: GeneroNewInterface): Observable<number> {
    return this.httpClient.post<number>(this.url+'/', genero, {withCredentials:true});
  }

  getOne(id: number): Observable<GeneroInterface> {
    return this.httpClient.get<GeneroInterface>(this.url +"/"+ id, {withCredentials:true});
  }

  updateGenero(genero: GeneroInterface): Observable<number> {
    return this.httpClient.put<number>(this.url, genero, {withCredentials:true});
  }

  deleteGenero(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
  }
}
