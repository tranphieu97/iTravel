import { Injectable } from '@angular/core';
import { Dictionary } from 'src/app/model/dictionary.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  dicMemberName: Dictionary = new Dictionary();
  dicMemberAvatar: Dictionary = new Dictionary();

  constructor(private server: ServerService) {
    this.dicMemberName = new Dictionary();
    this.dicMemberAvatar = new Dictionary();
  }

  getMemberName(tourguideId: string) {
    let tourguideName = this.dicMemberName.getValue(tourguideId);
    if (tourguideName !== null) {
      return tourguideName;
    } else {
      this.server.getUserBasicInfo(tourguideId).subscribe(res => {
        if (res.data) {
          tourguideName = res.data.lastName !== '' ? res.data.firstName + ' ' + res.data.lastName : res.data.firstName;
          this.dicMemberName.add(tourguideId, tourguideName);
          return tourguideName;
        }
      });
      setTimeout(() => {
        return tourguideName;
      }, 2000);
    }
  }

  getMemberAvatar(tourguideId: string) {
    let tourguideAvatar = this.dicMemberAvatar.getValue(tourguideId);
    if (tourguideAvatar !== null) {
      return tourguideAvatar;
    } else {
      this.server.getUserBasicInfo(tourguideId).subscribe(res => {
        if (res.data) {
          tourguideAvatar = res.data.avatar;
          this.dicMemberAvatar.add(tourguideId, tourguideAvatar);
          return tourguideAvatar;
        }
      });
      setTimeout(() => {
        return tourguideAvatar;
      }, 2000);
    }
  }
}
