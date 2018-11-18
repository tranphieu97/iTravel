import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../model/feedback.model';
import { ServerService } from '../../core/services/server.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedback: Feedback;

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.feedback = new Feedback();
    this.feedback.creationDatetime = new Date(Date.now());
    this.feedback.from = 'Example@gmail.com';
  }

  validationForm(): boolean {
    return true;
  }

  submitForm(): void {
    if (this.validationForm()) {
      this.server.postFeedback(this.feedback).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
