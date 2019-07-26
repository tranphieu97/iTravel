import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CardViewTour } from 'src/app/model/card-view-tour.model';
import { Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ServerService } from 'src/app/core/services/server.service';
import { ConstTourStatus } from 'src/app/constants';
import { UserService } from 'src/app/core/services/user.service';
import { ConstUserInterest } from 'src/app/constants/user-interest';

@Component({
  selector: 'app-horizontal-card-view-tour',
  templateUrl: './horizontal-card-view-tour.component.html',
  styleUrls: ['./horizontal-card-view-tour.component.scss']
})
export class HorizontalCardViewTourComponent implements OnInit {

  @Input() tourCardViewModel: CardViewTour;

  compLanguage;
  commonLanguage;
  public TOUR_STATUS: ConstTourStatus = new ConstTourStatus();
  public USER_INTEREST: ConstUserInterest = new ConstUserInterest();

  constructor(
    private router: Router,
    public tourService: TourService,
    private language: LanguageService,
    private serverService: ServerService,
    private userService: UserService
  ) { }

  @HostListener('click') onclick() {
    // update point
    try {
      if (
        this.router.url === '/filter/all' &&
        this.tourCardViewModel.status === this.TOUR_STATUS.REGISTERING &&
        this.userService.isLogin
      ) {
        this.serverService.updateTourInterest(this.tourCardViewModel._id, this.USER_INTEREST.INTEREST_LV2).subscribe();
      }
    } catch (error) {
      console.log(error.message);
    }
    this.router.navigate(['/tours/registering/', this.tourCardViewModel._id]);
  }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourView;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourView;
      this.commonLanguage = this.language.currentLanguage.common;
    });
  }
}
