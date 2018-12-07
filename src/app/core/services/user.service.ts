import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLogin: Boolean = false;
  public currentUser: User;

  constructor() { }

  /**
   * Set unique user is login information
   * @name setCurrentUser
   * @author phieu-th
   * @param _id
   * @param username
   * @param firstName
   * @param lastName
   */
  setCurrentUser(_id: string, username: string, firstName: string, lastName: string) {
    this.currentUser = new User(_id, username, firstName, lastName);
    this.isLogin = true;
  }

  /**
   * User logout
   * @name logOut
   * @author phieu-th
   */
  logOut() {
    this.currentUser = null;
    this.isLogin = false;
    localStorage.removeItem('itravel_currentUser');
  }
}
