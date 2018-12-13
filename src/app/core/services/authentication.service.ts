import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtHelpper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private server: ServerService, private user: UserService) { }

  /**
   * Send Login Form and save token if login is success
   * If login fail return error for conmponent
   * @name loginAsMember
   * @author phieu-th
   * @param loginForm
   */
  loginAsMember(loginForm: FormGroup): Observable<any> {
    const loginData = {
      username: loginForm.get('username').value,
      password: loginForm.get('password').value
    };

    return this.http.post<any>(this.server.HOST + 'auth/login', loginData, this.server.httpOptions)
      .pipe(map((res) => {
        const token = res.token;
        const data = res.data;

        if (token && data) {
          const jwtToken = this.jwtHelpper.decodeToken(res.token);

          if (data.username === jwtToken.username) {
            this.user.setCurrentUser(data._id, data.username, data.firstName, data.lastName);
            this.user.currentUser.avatar = data.avatar;
            if (data.isAdmin && jwtToken.isAdmin) {
              this.user.currentUser.isAdmin = true;
            } else {
              this.user.currentUser.isAdmin = false;
            }

            localStorage.setItem('itravel_currentUser', JSON.stringify(res.token));

            return {
              message: res.message,
              data: data
            };
          }
        }

        return {
          message: res.message,
          data: res.data
        };
      }));
  }

  /**
   * Check a Username be existed in database
   * @name checkExistUsername
   * @author phieu-th
   * @param username
   */
  checkExistUsername(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);

    return this.http.get<any>(this.server.HOST + 'auth/exist-username', {
      headers: this.server.httpOptions.headers,
      params: params
    });
  }

  /**
   * Register a new Account by data entered in Register form
   * @name registerUser
   * @author phieu-th
   * @param registerForm
   */
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

  getUserProfile(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);

    return this.http.get(this.server.HOST + 'user/profile', {headers: this.server.httpOptions.headers, params: params});
  }

  /**
   * Delete access token was saved in localstorage
   * @name clearToken
   * @author phieu-th
   */
  clearToken() {
    localStorage.removeItem('itravel_currentUser');
  }

  /**
   * Get access token was saved in localstorage
   * @name getLocalToken
   * @author phieu-th
   */
  getLocalToken() {
    return localStorage.getItem('itravel_currentUser');
  }
}
