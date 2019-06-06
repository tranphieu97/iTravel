import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-tour-feedback',
  templateUrl: './tour-feedback.component.html',
  styleUrls: ['./tour-feedback.component.scss']
})
export class TourFeedbackComponent implements OnInit {
  @Input() feedbacks: Tour;

  constructor() {}

  ngOnInit() {}
}
