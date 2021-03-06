import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourStatus } from 'src/app/constants';
import { TourService } from 'src/app/core/services/tour.service';
import { CardViewPost } from 'src/app/model/cardViewPost.model';
import { MembersService } from 'src/app/core/services/members.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConstUserInterest } from 'src/app/constants/user-interest';

@Component({
  selector: 'app-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.scss']
})
export class TourViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() tourId: string;
  public tourModel: Tour;

  public isLoading: Boolean = false;
  public TOUR_STATUS: ConstTourStatus = new ConstTourStatus();
  public USER_INTEREST: ConstUserInterest = new ConstUserInterest();

  public arrDays: Array<Date> = [];
  public arrRelatedPost: Array<CardViewPost> = [];

  public toggle = {
    timeline: true,
    register: true,
    schedule: true,
    preparation: true,
    contact: true,
    post: true
  };

  constructor(private server: ServerService, public language: LanguageService, public tourService: TourService,
    public membersService: MembersService, private userService: UserService) { }

  compLanguage;
  commonLanguage;
  timeOut;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourView;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourView;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.getTour();
  }

  async ngAfterViewInit() {
    this.timeOut = setTimeout(() => {
      try {
        if (this.TOUR_STATUS.REGISTERING === this.tourModel.status && this.userService.isLogin) {
          this.server.updateTourInterest(this.tourId, this.USER_INTEREST.INTEREST_LV1).subscribe();
        }
      } catch (error) {
        console.log(error.message);
      }
    }, 10000);
  }

  ngOnDestroy() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  getTour() {
    this.isLoading = true;
    this.server.getTour(this.tourId).subscribe(res => {
      if (res.data) {
        this.tourModel = res.data;

        this.tourModel.preparations.sort((pre1, pre2) => {
          return pre1.isRequired && !pre2.isRequired ? 1 : -1;
        });

        this.getRelatedPost();
      }
      this.isLoading = false;
    });
  }

  getRelatedPost() {
    if (this.tourModel) {
      this.server.getPostRelatedLocation(this.tourModel.locationIds).subscribe(res => {
          if (res.statusCode === 200) {
            this.arrRelatedPost = res.data;
          }
      });
    }
  }
}
