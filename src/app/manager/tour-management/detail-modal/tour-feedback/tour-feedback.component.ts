import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';

@Component({
  selector: 'app-tour-feedback',
  templateUrl: './tour-feedback.component.html',
  styleUrls: ['./tour-feedback.component.scss']
})
export class TourFeedbackComponent implements OnInit {
  @Input() tourData: Tour;

  constructor() {}

  ngOnInit() {}
}
