import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CardViewTour } from 'src/app/model/card-view-tour.model';
import { Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ServerService } from 'src/app/core/services/server.service';
import { ConstTourStatus } from 'src/app/constants';

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

  constructor(
    private router: Router,
    public tourService: TourService,
    private language: LanguageService,
    private serverService: ServerService
  ) { }

  @HostListener('click') onclick() {
    // update point
    if (this.router.url === '/filter/all' && this.tourCardViewModel.status === this.TOUR_STATUS.REGISTERING) {
      this.serverService.updateTourInterest(this.tourCardViewModel._id, 50).subscribe(() => {
        console.log('add point for search');
      });
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
