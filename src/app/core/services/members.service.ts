import { Injectable } from '@angular/core';
import { Dictionary } from 'src/app/model/dictionary.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private dicMemberName: Dictionary = new Dictionary();
  private dicMemberAvatar: Dictionary = new Dictionary();

  constructor(private server: ServerService) {
    this.dicMemberName = new Dictionary();
    this.dicMemberAvatar = new Dictionary();
  }

  getMemberName(memberId: string) {
    return this.dicMemberName.getValue(memberId);
  }

  saveMemberName(memberId: string, memberName: string) {
    if (this.dicMemberName.getValue(memberId) === null) {
      this.dicMemberName.add(memberId, memberName);
    }
  }

  getMemberAvatar(memberId: string) {
    return this.dicMemberAvatar.getValue(memberId);
  }

  saveMemberAvatar(memberId: string, avatar: string) {
    if (this.dicMemberAvatar.getValue(memberId) === null) {
      this.dicMemberAvatar.add(memberId, avatar);
    }
  }
}
