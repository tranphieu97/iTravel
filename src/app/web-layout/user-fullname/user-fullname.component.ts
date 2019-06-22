import { Component, OnInit, Input } from '@angular/core';
import { MembersService } from 'src/app/core/services/members.service';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-user-fullname',
  templateUrl: './user-fullname.component.html',
  styleUrls: ['./user-fullname.component.scss']
})
export class UserFullnameComponent implements OnInit {

  @Input() userId: string;
  @Input() sz: number;
  @Input() bold: Boolean;

  public userFullname: string;

  constructor(private memberService: MembersService, private server: ServerService) { }

  ngOnInit() {
    this.setUserFullname();
  }

  setUserFullname() {
    this.userFullname = this.memberService.getMemberName(this.userId);
    if (this.userFullname === null) {
      this.server.getUserBasicInfo(this.userId).subscribe(res => {
        if (res.data) {
          this.userFullname = res.data.lastName !== '' ? res.data.firstName + ' ' + res.data.lastName : res.data.firstName;
          this.memberService.saveMemberName(this.userId, this.userFullname);

          // Response include avatar, save it for the next time need get user avatar
          this.memberService.saveMemberAvatar(this.userId, res.data.avatar);
        }
      });
    }
  }
}
