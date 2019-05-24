import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../model/feedback.model';
import { ServerService } from '../../core/services/server.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedback: Feedback;
  message: String = '';
  isSuccess: Boolean = false;
  isFail: Boolean = false;
  compLanguage;

  constructor(private server: ServerService, private router: Router,
    public language: LanguageService, public user: UserService) { }

  ngOnInit() {
    this.feedback = new Feedback();
    this.feedback.creationDatetime = new Date(Date.now());

    if (this.user.isLogin && this.user.currentUser.username !== '') {
      this.feedback.from = this.user.currentUser.username;
    }

    this.message = '';
    this.isFail = false;
    this.isSuccess = false;

    this.compLanguage = this.language.currentLanguage.compFeedback;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.compFeedback);
  }

  validationForm(): boolean {
    if (this.feedback.name.trim() === '') {
      this.message = this.compLanguage.feedbackErrorNameRequired;
      return false;
    }

    if (this.feedback.kindOf.trim() === '') {
      this.message = this.compLanguage.feedbackErrorKindOfRequired;
      return false;
    }

    if (this.feedback.content.trim() === '') {
      this.message = this.compLanguage.feedbackErrorContentRequired;
      return false;
    }

    return true;
  }

  submitForm(): void {
    if (this.validationForm()) {
      this.server.postFeedback(this.feedback).subscribe((res) => {
        if (res.message === 'Success!') {
          this.message = this.compLanguage.feedbackSuccess;
          this.isSuccess = true;
          this.isFail = false;
          this.feedback = new Feedback();
        } else {
          this.message = this.compLanguage.feedbackFail;
          this.isFail = true;
          this.isSuccess = false;
        }
      });
    } else {
      this.isFail = true;
      this.isSuccess = false;
    }
  }

  cancelForm() {
    this.router.navigate(['/home']);
  }
}
