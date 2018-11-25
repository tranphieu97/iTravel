import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private server: ServerService) { }

  checkExistUsername(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http.get<any>(this.server.HOST + 'auth/exist-username', {
      params: params
    });
  }

  registerUser(registerForm: FormGroup): Observable<any> {
    const registerData = {
      username: registerForm.get('username').value,
      password: registerForm.get('password').value,
      firstName: registerForm.get('firstName').value,
      lastName: registerForm.get('lastName').value,
      confirmPassword: registerForm.get('confirmPassword').value,
      acceptPolicies: registerForm.get('acceptPolicies').value
    };

    return this.http.post<any>(this.server.HOST + 'auth/register-user', registerData, this.server.httpOptions);
  }
}
