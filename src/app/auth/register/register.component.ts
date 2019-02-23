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

  constructor(private router: Router, private formBuilder: FormBuilder,
    private authentication: AuthenticationService, public language: LanguageService) { }

  ngOnInit() {
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
    // if (this.isExistUsername()) {
    //   this.registerMessage = 'Username is exist, please choose the others name';
    //   this.isShowRegisterMessage.error = true;
    //   return;
    // } else if ( !this.isMatchPassword()) {
    //   this.registerMessage = 'Password and confirm password is not matched';
    //   return;
    // } else {
    //   this.authentication.registerUser(this.registerForm).subscribe((res) => {
    //     console.log(res);
    //   });
    // }
    return this.authentication.checkExistUsername(this.registerForm.get('username').value)
      .subscribe((checkExistResponse) => {
        if (checkExistResponse.data) {
          this.registerMessage = 'Username is exist, please choose the others name';
          this.isShowRegisterMessage.error = true;
          return;
        } else if (!this.isMatchPassword().valueOf()) {
          this.registerMessage = 'Password and confirm password is not matched';
          this.isShowRegisterMessage.error = true;
          return;
        } else {
          this.authentication.registerUser(this.registerForm)
            .subscribe((registerResponse) => {
              console.log(registerResponse.status);
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
