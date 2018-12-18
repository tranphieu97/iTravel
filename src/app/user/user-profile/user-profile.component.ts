import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;

  constructor(private user: UserService, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.user.currentUser;
    console.log(this.currentUser);

    if (this.currentUser === undefined || this.currentUser.username === null) {
      this.router.navigate(['/auth/login']);
    } else {
      this.authentication.getUserProfile(this.currentUser.username).subscribe((res) => {
        if (res.data && this.currentUser.username === res.data.username) {
          this.currentUser.setFullUserInfo(
            res.data._id,
            res.data.username,
            res.data.email,
            res.data.firstName,
            res.data.lastName,
            res.data.avatar,
            res.data.birthDay,
            res.data.level,
            res.data.hometown,
            res.data.point,
            res.data.permission
          );
        }
      });
    }
  }

}
