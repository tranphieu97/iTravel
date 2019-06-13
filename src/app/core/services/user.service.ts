import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogin: Boolean = false;
  currentUser: User;
  hasChangeUserInfo: Subject<any> = new Subject<any>();

  hasChangeUser: Subject<any> = new Subject<any>();
  isLoginChange = new Subject();

  private jwtHelpper: JwtHelperService = new JwtHelperService();

  constructor(private authentication: AuthenticationService, private server: ServerService) {
    this.currentUser = new User();

    // Check is exist user token in local
    if (this.isLogin === false && this.authentication.getLocalToken()
      && this.authentication.validToken(this.authentication.getLocalToken())) {
      this.authentication.loginByLocalToken().subscribe((res) => {
        const userData = res.data;

        // Re-login if token is valid
        if (this.authentication.validUserInfoByToken(userData.username, userData.isAdmin)) {
          this.currentUser.setUserRequiredInfo(userData._id, userData.username, userData.firstName, userData.lastName, userData.avatar);
          this.currentUser.isAdmin = userData.isAdmin;
          this.currentUser.isTourguide = userData.isTourguide;
          this.isLogin = true;
          this.isLoginChange.next();
          return;
        }
      });

      setTimeout(() => {}, 1500);
    }

    this.hasChangeUserInfo.subscribe(() => {
      if (this.getUserId() !== '') {
        this.server.getUserInfomation(this.getUserId()).subscribe(res => {
          if (res.statusCode === 200) {
            this.currentUser.avatar = res.data.avatar;
            this.currentUser.firstName = res.data.firstName;
            this.currentUser.lastName = res.data.lastName;
            this.currentUser.email = res.data.email;
            this.currentUser.hometown = res.data.hometown;
            this.currentUser.birthDay = new Date(res.data.birthDay);
            this.setFullname();
          }
        });
      }
    });
  }

  /**
   * User logout
   * @name logOut
   * @author phieu-th
   */
  logOut() {
    this.currentUser = new User();
    this.isLogin = false;
    this.authentication.clearToken();
    this.hasChangeUser.next();
  }

  getTokenUserId(): string {
    try {
      const token = this.authentication.getLocalToken();

      if (token) {
        const decodeToken = this.jwtHelpper.decodeToken(token);
        return decodeToken._id;
      } else {
        return '';
      }
    } catch (er) {
      console.log(er);
      return '';
    }
  }

  setFullname() {
    if (this.currentUser) {
      this.currentUser.fullName = this.currentUser.lastName !== undefined
        ? this.currentUser.firstName + '' + this.currentUser.lastName
        : this.currentUser.firstName;
    }
  }

  getUserId(): string {
    return this.getTokenUserId();
  }
}
