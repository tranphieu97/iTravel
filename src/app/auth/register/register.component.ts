import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerMessage: String = '';

  registerFormInfo: any = {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptPolicies: false,
    isValidUser: false
  };


  constructor(private router: Router, private authentication: AuthenticationService) { }

  ngOnInit() {

  }

  redirectToLogin(): void {
    this.router.navigate(['auth/login']);
  }

  redirecToHome(): void {
    this.router.navigate(['home']);
  }

  registerUser() {
    console.log(this.registerFormInfo);
  }

  checkFormValidation(): boolean {
    if (this.registerFormInfo.username.trim() === '') {
      this.registerMessage = 'Username is required';
      return false;
    }
  }

  // canbeUseUsername(formControl: FormControl): {[key: string]: boolean} | null {
  //   const username = formControl.value;

  //   this.authentication.checkExistUsername(username).subscribe((res) => {
  //     if (res.data) {
  //       return true;
  //     } else {
  //       return null;
  //     }
  //   });
  //   return null;
  // }
}
