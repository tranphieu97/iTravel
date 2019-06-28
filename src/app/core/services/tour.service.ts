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

  applyInterest(listRawTour, interestData): any {
    // apply interest
    const interestTours = [];
    const normalTours = [];
    for (const tour of listRawTour) {
      const interestItemOfThisTour = interestData.find(interestItem => interestItem.tourId === tour._id);
      if (interestItemOfThisTour) {
        tour.point = interestItemOfThisTour.point;
        interestTours.push(tour);
      } else {
        normalTours.push(tour);
      }
    }
    interestTours.sort((tour1, tour2) => tour2.point - tour1.point);
    return [...interestTours, ...normalTours];
  }
}
