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

    this.user.hasChangeUser.subscribe(() => {
      this.currentUser = this.user.currentUser;
    });

    if (this.currentUser === undefined || this.currentUser === null) {
      this.router.navigate(['home']);
    } else {
      this.authentication.getUserProfile(this.user.currentUser.username).subscribe((userProfile) => {

      });
    }
  }

}
