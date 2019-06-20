import { Component, OnInit, Input } from '@angular/core';
import { MembersService } from 'src/app/core/services/members.service';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() userId: string;
  @Input() sz: number;

  public userAvatar: string;

  constructor(private memberService: MembersService, private server: ServerService) { }

  ngOnInit() {
    this.setUserAvatar();
  }

  setUserAvatar() {
    this.userAvatar = this.memberService.getMemberAvatar(this.userId);
    if (this.userAvatar === null) {
      this.server.getUserBasicInfo(this.userId).subscribe(res => {
        if (res.data) {
          this.userAvatar = res.data.avatar;
          this.memberService.saveMemberAvatar(this.userId, this.userAvatar);

          // Response include name, save it for the next time need get user avatar
          const userFullname = res.data.lastName !== '' ? res.data.firstName + ' ' + res.data.lastName : res.data.firstName;
          this.memberService.saveMemberName(this.userId, userFullname);
        }
      });
    }
  }
}
