import { Injectable } from '@angular/core';
import { Dictionary } from 'src/app/model/dictionary.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  dicLocation: Dictionary = new Dictionary();

  constructor(private server: ServerService) { }

  getLocationName(locationId: string): string {
    let locationName = this.dicLocation.getValue(locationId);
    if (locationName !== null) {
      return locationName;
    } else {
      this.server.getOneLocation(locationId).subscribe(res => {
        if (res.data) {
          locationName = res.data.locationName;
          this.dicLocation.add(locationId, locationName);
          return locationName;
        }
      });
      setTimeout(() => {
        return locationName;
      }, 2000);
    }
  }
}
