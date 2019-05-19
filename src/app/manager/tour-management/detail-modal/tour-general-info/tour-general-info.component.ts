import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { Location } from 'src/app/model/location.model';

@Component({
  selector: 'app-tour-general-info',
  templateUrl: './tour-general-info.component.html',
  styleUrls: ['./tour-general-info.component.scss']
})
export class TourGeneralInfoComponent implements OnInit, AfterViewInit {
  @Input() tourData: Tour;
  collapsedStates = [];
  locationsData: Location[] = [];

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.collapsedStates = this.tourData.locationIds.map(id => ({
      locationId: id,
      collapsed: true
    }));
  }

  ngAfterViewInit() {
    this.tourData.locationIds.forEach((id, index) => {
      this.serverService
        .getOneLocation(id)
        .subscribe(res => (this.locationsData[index] = res.data));
      // .subscribe(res => console.log(res.data));
    });
  }

  collapedHandle(index: number) {
    const currentState = this.collapsedStates[index].collapsed;
    this.collapsedStates.map(state => {
      state.collapsed = true;
      return state;
    });
    this.collapsedStates[index].collapsed = !currentState;
  }
}
