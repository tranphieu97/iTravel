import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { TourMember } from 'src/app/model/tour-member.model';

@Component({
  selector: 'app-tour-member',
  templateUrl: './tour-member.component.html',
  styleUrls: ['./tour-member.component.scss']
})
export class TourMemberComponent implements OnInit, AfterViewInit {
  @Input() tourData: Tour;
  tourMemberInfo: {
    tourInfo: TourMember;
    basicInfo: { firstName: string; lastName: string; avatar: string };
  }[];
  available = 0;

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.available = this.tourData.memberLimit - this.tourData.members.length;
    this.tourMemberInfo = this.tourData.members.map(member => ({
      tourInfo: member,
      basicInfo: { firstName: '', lastName: '', avatar: '' }
    }));
  }

  ngAfterViewInit() {
    this.tourMemberInfo.forEach((info, index) => {
      this.serverService
        .getUserBasicInfo(info.tourInfo.memberId)
        .subscribe(res => {
          if (res.data) {
            this.tourMemberInfo[index].basicInfo = res.data;
          }
        });
    });
  }
}
