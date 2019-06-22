import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Observable } from 'rxjs';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerMessage: String = 'Test';
  isShowRegisterMessage: any = {
    success: false,
    error: false
  };

  isLoading: Boolean = false;

  // registerFormInfo: any = {
  //   username: '',
  //   password: '',
  //   confirmPassword: '',
  //   firstName: '',
  //   lastName: '',
  //   acceptPolicies: false,
  //   isValidUser: false
  // };

  registerForm: FormGroup;

  compLanguage;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private authentication: AuthenticationService, public language: LanguageService) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compRegister;
    this.language.hasChangeLanguage.subscribe(() =>  this.compLanguage = this.language.currentLanguage.compRegister);

    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, []],
      username: [null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30),
        Validators.pattern('^(?=.*[a-z])[a-z0-9._@-]{1,30}$')]],
      password: [null, [Validators.required, Validators.minLength(8),
      Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{1,30}$')]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8),
      Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{1,30}$')]],
      acceptPolicies: [null, [Validators.required]]
    });
  }

  registerUser() {
    this.isLoading = true;
    return this.authentication.checkExistUsername(this.registerForm.get('username').value)
      .subscribe((checkExistResponse) => {
        if (checkExistResponse.data) {
          this.registerMessage = this.compLanguage.registerUsernameExist;
          this.isShowRegisterMessage.error = true;
          this.isLoading = false;
          return;
        } else if (!this.isMatchPassword().valueOf()) {
          this.registerMessage = this.compLanguage.registerPasswordNotMatch;
          this.isShowRegisterMessage.error = true;
          this.isLoading = false;
          return;
        } else {
          this.authentication.registerUser(this.registerForm)
            .subscribe((registerResponse) => {
              this.isLoading = false;
              if (registerResponse.statusCode === 201) {
                this.isShowRegisterMessage.success = true;
                this.isShowRegisterMessage.error = false;
                this.registerMessage = this.compLanguage.registerSuccess;
              } else {
                this.isShowRegisterMessage.success = false;

                if (registerResponse.statusCode === 409) {
                  this.registerMessage = this.compLanguage.registerUsernameExist;
                } else {
                  this.registerMessage = this.compLanguage.registerFail;
                }
              }
            });
        }
      });
  }

  isMatchPassword(): boolean {
    if (this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value) {
      return true;
    }

    return false;
  }

  redirectToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  redirecToHome(): void {
    this.router.navigate(['home']);
  }
}
