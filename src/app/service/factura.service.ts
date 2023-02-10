import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacturaInterface, FacturaNewInterface, FacturaPageInterface } from '../model/Factura-interface';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private entityURL: string = "/factura";
  url: string = "";

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = `${environment.baseURL}${this.entityURL}`;
   }

   getPageFactura(page:number, size:number, id_usuario:number, strSortField:string, strOrderDirection:string)
  :Observable<FacturaPageInterface> {

    let params = new HttpParams()
    .set("page",page)
    .set("size", size);

    if(id_usuario != 0) {
      params = params.set("entrada", id_usuario);
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

    return this.httpClient.get<FacturaPageInterface>(this.url, httpOptions);
  }

  createFactura(newCompra: FacturaNewInterface): Observable<number> {
    return this.httpClient.post<number>(this.url+"/", newCompra, {withCredentials:true});
  }

  getFactura(id:number): Observable<FacturaInterface> {
    return this.httpClient.get<FacturaInterface>(this.url+"/"+id, {withCredentials:true});
  }

  deleteFactura(id:number): Observable<number> {
    return this.httpClient.delete<number>(this.url+"/"+id, {withCredentials:true});
  }

  updateFactura(newCompra: FacturaNewInterface): Observable<number> {
    return this.httpClient.put<number>(this.url, newCompra, {withCredentials:true});
  }
}
