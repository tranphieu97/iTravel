import { Component, OnInit, Input } from '@angular/core';
import { TourFeedback } from 'src/app/model/tour-feedback.model';

@Component({
  selector: 'app-tour-feedback-item',
  templateUrl: './tour-feedback-item.component.html',
  styleUrls: ['./tour-feedback-item.component.scss']
})
export class TourFeedbackItemComponent implements OnInit {
  @Input() feedbackData: TourFeedback;

  constructor() {}

  ngOnInit() {}
}
