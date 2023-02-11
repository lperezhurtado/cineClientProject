import { PeliculaPageInterface, PeliculaInterface } from './../model/Pelicula-interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private entityURL = "/pelicula";
  url:string = "";

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.baseURL}${this.entityURL}`;
   }

   //GETPAGE
   getPlistPelicula(page:number, size:number, filter:string, id_genero:number, strSortField:string, strOrderDirection:string )
   :Observable<PeliculaPageInterface> {

    let params = new HttpParams()
    .set("filter", filter)
    .set("page", page)
    .set("size", size);

    if (id_genero != 0) {
      params = params.set("genero", id_genero);
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

    return this.httpClient.get<PeliculaPageInterface>(this.url, httpOptions);
   }
   countPelicula(): Observable<number> {
    return this.httpClient.get<number>(this.url+'/count',{withCredentials:true});
   }

   //GET
   getPelicula(id: number): Observable<PeliculaInterface> {
    return this.httpClient.get<PeliculaInterface>(this.url+'/'+id, {withCredentials:true});
   }

   //CREATE
   createPelicula(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(this.url+'/', formData, {withCredentials:true});
   }

   //UPDATE
   updatePelicula(formData: FormData): Observable<number> {
    return this.httpClient.put<number>(this.url, formData, {withCredentials:true});
   }

   //DELETE
   deletePelicula(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
   }

}
