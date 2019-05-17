import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';

@Component({
  selector: 'app-tour-schedule',
  templateUrl: './tour-schedule.component.html',
  styleUrls: ['./tour-schedule.component.scss']
})
export class TourScheduleComponent implements OnInit {
  @Input() tourData: Tour;

  constructor() {}

  ngOnInit() {}
}
