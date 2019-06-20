import { Component, OnInit, Input } from '@angular/core';
import { TourService } from 'src/app/core/services/tour.service';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-location-name',
  templateUrl: './location-name.component.html',
  styleUrls: ['./location-name.component.scss']
})
export class LocationNameComponent implements OnInit {

  @Input() locationId: string;
  @Input() sz: number;

  public locationName: string;

  constructor(private tourService: TourService, private server: ServerService) { }

  ngOnInit() {
    this.setLocationName();
  }

  setLocationName() {
    this.locationName = this.tourService.getLocationName(this.locationId);
    if (this.locationName === null) {
      this.server.getOneLocation(this.locationId).subscribe(res => {
        if (res.data) {
          this.locationName = res.data.locationName;
          this.tourService.saveLocation(this.locationId, this.locationName);
        }
      });
    }
  }
}
