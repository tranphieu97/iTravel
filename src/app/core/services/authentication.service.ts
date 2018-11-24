import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private server: ServerService) { }

  checkExistUsername(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http.get<any>(this.server.HOST + 'auth/exist-username', {params: params} );
  }
}
