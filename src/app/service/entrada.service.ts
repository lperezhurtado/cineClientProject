import { EntradaInterface, EntradaNewInterface } from './../model/Entrada-interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private entityURL: string = "/entrada";
  url: string = "";

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.baseURL}${this.entityURL}`;
  }

  getListEntrada(idSesion: number): Observable<EntradaInterface[]> {
    let params = new HttpParams()
    .set("sesion", idSesion)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=UTF-8'
      }),
      withCredentials: true,
      params: params
    };

    return this.httpClient.get<EntradaInterface[]>(this.url+'/list', httpOptions);
  }

  getEntrada(id: number): Observable<EntradaInterface> {
    return this.httpClient.get<EntradaInterface>(this.url+"/"+id, {withCredentials:true});
  }

  deleteEntrada(id:number): Observable<number> {
    return this.httpClient.delete<number>(this.url+"/"+id, {withCredentials:true});
  }

  updateEntrada(newEntrada: EntradaNewInterface): Observable<number> {
    return this.httpClient.put<number>(this.url, newEntrada, {withCredentials:true});
  }
}
