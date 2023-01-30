import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SalaPageInterface, SalaInterface, SalaNewInterface } from '../model/Sala-interface';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private entityURL: string = "/sala";
  private url: string = `${environment.baseURL}${this.entityURL}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  plistSala(page: number, size: number, id_tiposala:number, strSortField:string, strOrderDirection:string): Observable<SalaPageInterface> {

    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    if (id_tiposala != 0) {
      params = params.set("tiposala", id_tiposala);
    }

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

    return this.httpClient.get<SalaPageInterface>(this.url, httpOptions);
  }

  createSala(sala: SalaNewInterface): Observable<number> {
    return this.httpClient.post<number>(this.url+'/', sala, {withCredentials:true});
  }

  getSala(id: number): Observable<SalaInterface> {
    return this.httpClient.get<SalaInterface>(this.url +"/"+ id, {withCredentials:true});
  }

  updateSala(sala: SalaNewInterface): Observable<number> {
    return this.httpClient.put<number>(this.url, sala, {withCredentials:true});
  }

  deleteSala(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
  }
}
