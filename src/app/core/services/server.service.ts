import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../../model/Province';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  HOST: String = 'http://localhost:7979/';

  constructor(private http: HttpClient) { }

  GetListProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.HOST + 'db/provinces/');
  }
}
