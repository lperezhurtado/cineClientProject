import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUsuario2Send, IUsuario2Update, UsuarioInterface, UsuarioPageInterface } from '../model/Usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private entityURL = '/usuario';
  url: string = "";

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.baseURL}${this.entityURL}`;
   }

   getUsuarioPlist(page:number, size:number, termino:string, id_usertype:number, strSortField:string, strOrderDirection:string )
   : Observable<UsuarioPageInterface> {

    let params = new HttpParams()
    .set("filter", termino)
    .set("page", page)
    .set("size", size);

    if (id_usertype != 0) {
      params = params.set("tipousuario", id_usertype);
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

    return this.httpClient.get<UsuarioPageInterface>(this.url, httpOptions)
   }

   createUsuario(usuario2Send: IUsuario2Send): Observable<number> {
    return this.httpClient.post<number>(this.url+"/", usuario2Send, {withCredentials:true});
   }

   getUsuario(id: number): Observable<UsuarioInterface>{
    return this.httpClient.get<UsuarioInterface>(this.url+'/'+id, {withCredentials:true});
   }

   deleteUsuario(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
   }

   updateUsuario(usuario2Update: IUsuario2Update): Observable<number> {
    return this.httpClient.put<number>(this.url, usuario2Update, {withCredentials:true});
   }

   generateUsuario(cantidad: number): Observable<number> {
    return this.httpClient.post<number>(this.url+'/generate/'+cantidad, {withCredentials:true});
   }

}
