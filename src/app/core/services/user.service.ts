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

  constructor() {
    this.currentUser = new User('', '', '', '');
  }

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

    this.hasChangeUser.next();
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
    this.hasChangeUser.next();
  }
}
