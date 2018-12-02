import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isFailLogin: Boolean = false;
  erorMessage: String = '';

  usernameRegex: RegExp = new RegExp('^(?=.*[a-z])[a-z0-9._@-]{1,30}$');
  passwordRegex: RegExp = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{1,30}$');

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('^(?=.*[a-z])[a-z0-9._@-]{1,30}$')]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  validateData() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if (username === '' || username.length < 6 || username.length > 30
      || password === '' || password.length < 8
      || !this.usernameRegex.test(username) || !this.passwordRegex.test(password)) {
      this.erorMessage = 'Invalid Account';
      this.isFailLogin = true;
    }
  }

  redirectToRegister() {
    this.router.navigate(['auth/register']);
  }

}
