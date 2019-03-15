import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { LanguageService } from '../../core/services/language.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isFailLogin: Boolean = false;
  loginMessage: String = '';

  isLoading: Boolean = false;

  private usernameRegex: RegExp = new RegExp('^(?=.*[a-z])[a-z0-9._@-]{1,30}$');
  private passwordRegex: RegExp = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{1,30}$');

  constructor(private router: Router, private formBuilder: FormBuilder, private user: UserService,
    private authentication: AuthenticationService, public language: LanguageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.pattern('^(?=.*[a-z])[a-z0-9._@-]{1,30}$')]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Validation login data was enterd and login if it valid
   * @name validateData
   * @author phieu-th
   */
  validateData() {
    this.isLoading = true;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if (username === '' || username.length < 6 || username.length > 30
      || password === '' || password.length < 8
      || !this.usernameRegex.test(username) || !this.passwordRegex.test(password)) {
      this.loginMessage = 'Invalid Account';
      this.isFailLogin = true;
    } else {
      this.authentication.loginByBasicInput(this.loginForm).subscribe((res) => {
        if (!res.data) {
          this.loginMessage = res.message;
          this.isFailLogin = true;
          this.isLoading = false;
        } else {
          this.user.currentUser = new User();
          this.user.currentUser.setUserRequiredInfo(res.data._id, res.data.username,
            res.data.firstName, res.data.lastName, res.data.avatar);
          this.user.currentUser.isAdmin = res.data.isAdmin;
          this.user.isLogin = true;
          this.isLoading = false;
          this.router.navigate(['home']);
        }
      });
    }
  }

  /**
   * Redirect to Register screen
   * @name redirectToRegister
   * @author phieu-th
   */
  redirectToRegister() {
    this.router.navigate(['auth/register']);
  }

}
