import { Injectable } from '@angular/core';
import { Dictionary } from 'src/app/model/dictionary.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  dicMemberName: Dictionary = new Dictionary();
  dicMemberAvatar: Dictionary = new Dictionary();

  arrUsername: Array<{ id: string, username: string }>;
  arrUserAvatar: Array<{ id: string, avatar: string }>;

  constructor(private server: ServerService) {
    this.dicMemberName = new Dictionary();
    this.dicMemberAvatar = new Dictionary();

    this.arrUsername = new Array<{ id: string, username: string }>();
    this.arrUserAvatar = new Array<{ id: string, avatar: string }>();
  }

  getMemberName(memberId: string) {
    // let memberName = this.dicMemberName.getValue(memberId);
    const usernameIndex = this.arrUsername.findIndex(x => x.id === memberId);
    if (usernameIndex !== -1) {
      return this.arrUsername[usernameIndex].username;
    } else {
      let memberName = '';
      this.server.getUserBasicInfo(memberId).subscribe(res => {
        if (res.data) {
          memberName = res.data.lastName !== '' ? res.data.firstName + ' ' + res.data.lastName : res.data.firstName;
          // this.dicMemberName.add(memberId, memberName);

          if (!this.arrUsername.includes({ id: memberId, username: memberName })) {
            this.arrUsername.push({ id: memberId, username: memberName });
          }
          return memberName;
        }
      });
      setTimeout(() => {
        return memberName;
      }, 2000);
    }
  }

  getMemberAvatar(memberId: string) {
    let memberAvatar = this.dicMemberAvatar.getValue(memberId);
    if (memberAvatar !== null) {
      return memberAvatar;
    } else {
      this.server.getUserBasicInfo(memberId).subscribe(res => {
        if (res.data) {
          memberAvatar = res.data.avatar;
          this.dicMemberAvatar.add(memberId, memberAvatar);
          return memberAvatar;
        }
      });
      setTimeout(() => {
        return memberAvatar;
      }, 2000);
    }
  }
}
