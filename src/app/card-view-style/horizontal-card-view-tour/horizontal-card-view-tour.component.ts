import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CardViewTour } from 'src/app/model/card-view-tour.model';
import { Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-horizontal-card-view-tour',
  templateUrl: './horizontal-card-view-tour.component.html',
  styleUrls: ['./horizontal-card-view-tour.component.scss']
})
export class HorizontalCardViewTourComponent implements OnInit {

  @Input() tourCardViewModel: CardViewTour;

  compLanguage;
  commonLanguage;

  constructor(private router: Router, public tourService: TourService, private language: LanguageService) { }

  @HostListener('click') onclick() {
    // router here
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
