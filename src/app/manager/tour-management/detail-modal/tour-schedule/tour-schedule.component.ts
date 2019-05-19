import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-tour-schedule',
  templateUrl: './tour-schedule.component.html',
  styleUrls: ['./tour-schedule.component.scss']
})
export class TourScheduleComponent implements OnInit, AfterViewInit {
  @Input() tourData: Tour;
  participantInfos: {
    memberId: string;
    info: {
      firstName: string;
      lastName: string;
      avatar: string;
    };
  }[][] = [];

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.participantInfos = this.tourData.schedules.map(schedule =>
      schedule.performerIds.map(memId => ({
        memberId: memId,
        info: { firstName: '', lastName: '', avatar: '' }
      }))
    );
  }

  ngAfterViewInit() {
    this.participantInfos = this.participantInfos.map(
      (participantOfSchedule, index) =>
        participantOfSchedule.map((eachInfo, infoIndex) => {
          this.serverService
            .getUserBasicInfo(eachInfo.memberId)
            .subscribe(res => {
              if (res.data) {
                eachInfo.info = res.data;
              } else {
                // console.log(res.message);
              }
            });
          return eachInfo;
        })
    );
  }
}
