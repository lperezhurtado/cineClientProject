import { SesionNewInterface } from './../model/Sesion-interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SesionInterface, SesionPageInterface } from '../model/Sesion-interface';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private entityURL = "/sesion";
  url:string = "";

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.baseURL}${this.entityURL}`
  }
  //GETPAGE
  getPlistSesion(page:number, size:number, filter:string/*DE MOMENTO SE QUEDA filter*/, id_sala:number, id_pelicula:number, id_tarifa:number, strSortField:string, strOrderDirection:string )
   :Observable<SesionPageInterface> {

    let params = new HttpParams()
    .set("filter", filter)
    .set("page", page)
    .set("size", size);

    if (id_sala != 0) {
      params = params.set("sala", id_sala);
    }

    if (id_pelicula != 0) {
      params = params.set("pelicula", id_pelicula);
    }

    if (id_tarifa != 0) {
      params = params.set("tarifa", id_tarifa);
    }

    if (strSortField != "") {
      if (strOrderDirection != "") {
        params = params.set("sort", strSortField+","+strOrderDirection);
      } else {
        params = params.set("sort", strSortField);
      }
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=UTF-8'
      }),
      withCredentials: true,
      params: params
    };

    return this.httpClient.get<SesionPageInterface>(this.url, httpOptions);
   }

    //GET
    getSesion(id: number): Observable<SesionInterface> {
      return this.httpClient.get<SesionInterface>(this.url+'/'+id, {withCredentials:true});
     }

     //CREATE
     createSesion(sesion: SesionNewInterface): Observable<number> {
      return this.httpClient.post<number>(this.url+'/', sesion, {withCredentials:true});
     }

     //UPDATE
     updateSesion(sesion: SesionNewInterface): Observable<number> {
      return this.httpClient.put<number>(this.url, sesion, {withCredentials:true});
     }

     //DELETE
     deleteSesion(id: number): Observable<number> {
      return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
     }
}
