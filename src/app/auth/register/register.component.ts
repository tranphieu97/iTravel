import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: String = '';
  password: String = '';
  confirmPassword: String = '';
  firstName: String = '';
  lastName: String = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
}
