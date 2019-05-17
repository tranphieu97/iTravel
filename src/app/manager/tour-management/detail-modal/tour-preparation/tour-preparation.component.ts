import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';

@Component({
  selector: 'app-tour-preparation',
  templateUrl: './tour-preparation.component.html',
  styleUrls: ['./tour-preparation.component.scss']
})
export class TourPreparationComponent implements OnInit {
  @Input() tourData: Tour;

  constructor() {}

  ngOnInit() {}
}
