import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';

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
  compLanguage;

  constructor(
    private serverService: ServerService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
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
