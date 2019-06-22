import { Injectable } from '@angular/core';
import { Dictionary } from 'src/app/model/dictionary.model';
import { ServerService } from './server.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  dicLocation: Dictionary = new Dictionary();

  constructor(private server: ServerService) { }

  getLocationName(locationId: string): string {
    return this.dicLocation.getValue(locationId);
  }

  saveLocation(locationId: string, locationName: string) {
    if (this.dicLocation.getValue(locationId) === null) {
      this.dicLocation.add(locationId, locationName);
    }
  }
}
