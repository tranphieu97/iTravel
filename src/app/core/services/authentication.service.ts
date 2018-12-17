import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelpper: JwtHelperService = new JwtHelperService();
  private localStorageTokenName = 'itravel_currentUser';

  constructor(private http: HttpClient, private server: ServerService) {
  }

  /**
   * Send Login Form and save token if login is success
   * If login fail return error for conmponent
   * @name loginByBasicInput
   * @author phieu-th
   * @param loginForm
   */
  loginByBasicInput(loginForm: FormGroup): Observable<any> {
    const loginData = {
      username: loginForm.get('username').value,
      password: loginForm.get('password').value
    };

    return this.http.post<any>(this.server.HOST + 'auth/login', loginData, this.server.httpOptions)
      .pipe(map((res) => {
        const token = res.token;
        const data = res.data;

        if (token && data) {
          try {
            const jwtToken = this.jwtHelpper.decodeToken(res.token);

            if (data.username === jwtToken.username) {
              // this.user.setCurrentUser(data._id, data.username, data.firstName, data.lastName);
              // this.user.currentUser.avatar = data.avatar;
              // if (data.isAdmin && jwtToken.isAdmin) {
              //   this.user.currentUser.isAdmin = true;
              // } else {
              //   this.user.currentUser.isAdmin = false;
              // }
              this.setLocalToken(token);
            }
          } catch (ex) {

          }
        }

        return {
          message: res.message,
          data: data
        };
      }));
  }

  /**
   * Login by token was saved in localStorage
   * @name loginByLocalToken
   * @author phieu-th
   */
  loginByLocalToken(): Observable<any> {
    return this.http.post<any>(this.server.HOST + 'user/token-login', {}).pipe(map((res) => {
      const token = res.token;
      const data = res.data;

      if (token && data) {
        try {
          const jwtToken = this.jwtHelpper.decodeToken(res.token);

          if (data.username === jwtToken.username) {
            this.setLocalToken(token);
          }
        } catch (ex) {
        }
      }

      return {
        message: res.message,
        data: data
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

  /**
   * Get User information by username
   * @name getUserProfile
   * @author phieu-th
   * @param username
   */
  getUserProfile(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);

    return this.http.get(this.server.HOST + 'user/profile', { params: params });
  }

  /**
   * Delete access token was saved in localStorage
   * @name clearToken
   * @author phieu-th
   */
  clearToken() {
    localStorage.removeItem('itravel_currentUser');
  }

  /**
   * Get access token was saved in localStorage
   * @name getLocalToken
   * @author phieu-th
   */
  getLocalToken() {
    return localStorage.getItem(this.localStorageTokenName);
  }

  /**
   * Save token to localStorage with name is 'itravel_currentUser'
   * @name setLocalToken
   * @author phieu-th
   * @param token
   */
  setLocalToken(token: string) {
    if (token !== undefined && token !== '') {
      localStorage.setItem(this.localStorageTokenName, JSON.stringify(token));
    }
  }

  /**
   * Check a token is valid like a JWT Token
   * @name validToken
   * @author phieu-th
   * @param token
   */
  validToken(token: string): boolean {
    if (token === '') {
      return false;
    }

    try {
      const jwtToken = this.jwtHelpper.decodeToken(token);

      if (jwtToken.exp < Date.now().valueOf() / 1000) {
        return false;
      }

      return true;
    } catch (ex) {
      return false;
    }
  }

  /**
   * Check current user valid with it's token
   * @param username
   * @param isAdmin
   */
  validUserInfoByToken(username: string, isAdmin: boolean): boolean {
    const token = this.getLocalToken();

    try {
      const tokenData = this.jwtHelpper.decodeToken(token);

      if (tokenData.username === username && tokenData.isAdmin === isAdmin) {
        return true;
      }
    } catch (ex) {

    }

    return false;
  }
}
