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

  setCurrentUser(_id: string, username: string, firstName: string, lastName: string) {
    this.currentUser = new User(_id, username, firstName, lastName);
    this.isLogin = true;
  }

  logOut() {
    this.currentUser = null;
    this.isLogin = false;
    localStorage.removeItem('itravel_currentUser');
  }
}
