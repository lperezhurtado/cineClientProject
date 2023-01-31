import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoUsuarioInterface, TipoUsuarioResponse } from '../model/TipoUsuario-interface';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private entityURL: string = "/tipousuario";

  getUsersTypePlist(page: number, size: number): Observable<TipoUsuarioResponse>{
    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=UTF-8'
      }),
      withCredentials: true,
      params: params
    };
    const url : string = `${environment.baseURL}${this.entityURL}`;
    return this.httpClient.get<TipoUsuarioResponse>(url, httpOptions);
  }

  getOne(id: number): Observable<TipoUsuarioInterface> {
    return this.httpClient.get<TipoUsuarioInterface>(`${environment.baseURL}${this.entityURL}` + "/" + id, {withCredentials:true});
  }
}
