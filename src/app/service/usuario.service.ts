import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: String = "";

  constructor(private httpClient: HttpClient) {

   }
}
