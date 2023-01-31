import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TarifaPageInterface, TarifaInterface } from '../model/Tarifa-interface';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  private entityURL: string = "/tarifa";
  private url: string = `${environment.baseURL}${this.entityURL}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  plistTarifa(page: number, size: number): Observable<TarifaPageInterface> {

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

    return this.httpClient.get<TarifaPageInterface>(this.url, httpOptions);
  }

  createTarifa(tarifa: TarifaInterface): Observable<number> {
    return this.httpClient.post<number>(this.url+'/', tarifa, {withCredentials:true});
  }

  getTarifa(id: number): Observable<TarifaInterface> {
    return this.httpClient.get<TarifaInterface>(this.url +"/"+ id, {withCredentials:true});
  }

  updateTarifa(tarifa: TarifaInterface): Observable<number> {
    return this.httpClient.put<number>(this.url, tarifa, {withCredentials:true});
  }

  deleteTarifa(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
  }
}