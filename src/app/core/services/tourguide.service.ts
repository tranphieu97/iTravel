import { Injectable } from '@angular/core';
import { Dictionary } from 'src/app/model/dictionary.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class TourguideService {

  dicTourguide: Dictionary = new Dictionary();
  dicTourguideAvatar: Dictionary = new Dictionary();

  constructor(private server: ServerService) {
    this.dicTourguide = new Dictionary();
    this.dicTourguideAvatar = new Dictionary();
  }

  getTourguideName(tourguideId: string) {
    let tourguideName = this.dicTourguide.getValue(tourguideId);
    if (tourguideName !== null) {
      return tourguideName;
    } else {
      this.server.getUserBasicInfo(tourguideId).subscribe(res => {
        if (res.data) {
          tourguideName = res.data.lastName !== '' ? res.data.firstName + ' ' + res.data.lastName : res.data.firstName;
          this.dicTourguide.add(tourguideId, tourguideName);
          return tourguideName;
        }
      });
      setTimeout(() => {
        return tourguideName;
      }, 2000);
    }
  }

  getTourguideAvatar(tourguideId: string) {
    let tourguideAvatar = this.dicTourguideAvatar.getValue(tourguideId);
    if (tourguideAvatar !== null) {
      return tourguideAvatar;
    } else {
      this.server.getUserBasicInfo(tourguideId).subscribe(res => {
        if (res.data) {
          tourguideAvatar = res.data.avatar;
          this.dicTourguideAvatar.add(tourguideId, tourguideAvatar);
          return tourguideAvatar;
        }
      });
      setTimeout(() => {
        return tourguideAvatar;
      }, 2000);
    }
  }
}
