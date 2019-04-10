import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogin: Boolean = false;
  currentUser: User;

  hasChangeUser: Subject<any> = new Subject<any>();
  isLoginChange = new Subject();

  constructor(private authentication: AuthenticationService) {
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
          this.isLogin = true;
          this.isLoginChange.next();
        }
      });
    }
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
}
