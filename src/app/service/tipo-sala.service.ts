import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoSalaInterface, TipoSalaNewInterface, TSalaPageInterface } from '../model/TipoSala-interface';

@Injectable({
  providedIn: 'root'
})
export class TipoSalaService {

  private entityURL: string = "/tiposala";
  private url: string = `${environment.baseURL}${this.entityURL}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  plistTipoSala(page: number, size: number, filter: string, strSortField:string, strOrderDirection:string): Observable<TSalaPageInterface> {

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

    return this.httpClient.get<TSalaPageInterface>(this.url, httpOptions);
  }

  createTipoSala(tipoSala: TipoSalaNewInterface): Observable<number> {
    return this.httpClient.post<number>(this.url+'/', tipoSala, {withCredentials:true});
  }

  getTipoSala(id: number): Observable<TipoSalaInterface> {
    return this.httpClient.get<TipoSalaInterface>(this.url +"/"+ id, {withCredentials:true});
  }

  updateTipoSala(tipoSala: TipoSalaInterface): Observable<number> {
    return this.httpClient.put<number>(this.url, tipoSala, {withCredentials:true});
  }

  deleteTipoSala(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
  }
}
