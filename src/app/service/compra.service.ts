import { CompraPageInterface, CompraNewInterface, CompraInterface } from './../model/Compra-interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private entityURL: string = "/compra";
  url: string = "";

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = `${environment.baseURL}${this.entityURL}`;
  }

  getPageCompra(page:number, size:number, id_entrada:number, strSortField:string, strOrderDirection:string)
  :Observable<CompraPageInterface> {

    let params = new HttpParams()
    .set("page",page)
    .set("size", size);

    if(id_entrada != 0) {
      params = params.set("entrada", id_entrada);
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
    }

    return this.httpClient.get<CompraPageInterface>(this.url, httpOptions);
  }

  createCompra(newCompra: CompraNewInterface): Observable<number> {
    return this.httpClient.post<number>(this.url+"/", newCompra, {withCredentials:true});
  }

  getCompra(id:number): Observable<CompraInterface> {
    return this.httpClient.get<CompraInterface>(this.url+"/"+id, {withCredentials:true});
  }

  deleteCompra(id:number): Observable<number> {
    return this.httpClient.delete<number>(this.url+"/"+id, {withCredentials:true});
  }

  updateCompra(newCompra: CompraNewInterface): Observable<number> {
    return this.httpClient.put<number>(this.url, newCompra, {withCredentials:true});
  }

}
