import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { TourMember } from 'src/app/model/tour-member.model';
import { LanguageService } from 'src/app/core/services/language.service';
import { Router } from '@angular/router';

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
  compLanguage;
  allowSeeUserPrivateInfo = ['/tours/manager'];
  allowSeeCanceled = ['/tours/manager'];
  currentPath: string;

  constructor(
    private serverService: ServerService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentPath = this.router.url;
    // this.allowSeeFeedback.includes(this.currentPath);
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
    if (!this.allowSeeCanceled.includes(this.currentPath)) {
      this.tourData.members = this.tourData.members.filter(
        member => !member.cancelTime
      );
    }
    this.available =
      this.tourData.memberLimit -
      this.tourData.members
        .filter(member => !member.cancelTime)
        .reduce(
          (total, currentMember) => (total = total + currentMember.registerFor),
          0
        );
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

  onCollectedMoney(memberItemId: string, index: number) {
    if (
      !this.tourMemberInfo[index].tourInfo.cost ||
      this.tourMemberInfo[index].tourInfo.cancelTime
    ) {
      return;
    }
    this.serverService
      .updateTourMemberCost(this.tourData._id, memberItemId)
      .subscribe(res => {
        if (res.message === 'Success') {
          this.tourMemberInfo[index].tourInfo.cost = 0;
        }
      });
  }
}
