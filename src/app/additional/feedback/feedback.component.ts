import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../model/feedback.model';
import { ServerService } from '../../core/services/server.service';
import { Router } from '@angular/router';


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

  constructor(private server: ServerService, private router: Router) { }

  ngOnInit() {
    this.feedback = new Feedback();
    this.feedback.creationDatetime = new Date(Date.now());
    this.feedback.from = 'Example@gmail.com';

    this.message = '';
    this.isFail = false;
    this.isSuccess = false;
  }

  validationForm(): boolean {
    if (this.feedback.name.trim() === '') {
      this.message = 'Feedback name is required';
      return false;
    }

    if (this.feedback.kindOf.trim() === '') {
      this.message = 'Choose kind of feedback is required';
      return false;
    }

    if (this.feedback.content.trim() === '') {
      this.message = 'Feedback content is required';
      return false;
    }

    return true;
  }

  submitForm(): void {
    if (this.validationForm()) {
      this.server.postFeedback(this.feedback).subscribe((res) => {
        if (res.message === 'Success!') {
          this.message = 'Feedback Success! Thanks for your feedback';
          this.isSuccess = true;
          this.feedback = new Feedback();
        } else {
          this.message = 'Feedback Fail! Please try again';
          this.isFail = true;
        }
      });
    } else {
      this.isFail = true;
    }
  }

  cancelForm() {
    this.router.navigate(['/home']);
  }
}
