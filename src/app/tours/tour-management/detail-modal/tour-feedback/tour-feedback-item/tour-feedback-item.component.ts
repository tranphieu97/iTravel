import { Component, OnInit, Input } from '@angular/core';
import { TourFeedback } from 'src/app/model/tour-feedback.model';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-tour-feedback-item',
  templateUrl: './tour-feedback-item.component.html',
  styleUrls: ['./tour-feedback-item.component.scss']
})
export class TourFeedbackItemComponent implements OnInit {
  @Input() feedbackData: TourFeedback;
  authorInfo: { firstName: string; lastName: string; avatar: string } = {
    firstName: '',
    lastName: '',
    avatar: ''
  };

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.serverService
      .getUserBasicInfo(this.feedbackData.from)
      .subscribe(res => {
        if (res.data) {
          this.authorInfo = res.data;
        }
      });
  }
}
