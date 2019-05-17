import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';

@Component({
  selector: 'app-tour-general-info',
  templateUrl: './tour-general-info.component.html',
  styleUrls: ['./tour-general-info.component.scss']
})
export class TourGeneralInfoComponent implements OnInit {
  @Input() tourData: Tour;
  collapsedStates = [];

  constructor() {}

  ngOnInit() {
    this.collapsedStates = this.tourData.locationIds.map(id => ({
      locationId: id,
      collapsed: true
    }));
  }
}
