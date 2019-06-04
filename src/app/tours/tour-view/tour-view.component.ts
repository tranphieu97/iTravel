import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourStatus } from 'src/app/constants';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.scss']
})
export class TourViewComponent implements OnInit {

  @Input() tourId: string;
  public tourModel: Tour;

  public isLoading: Boolean = false;
  public TOUR_STATUS: ConstTourStatus = new ConstTourStatus();

  constructor(private server: ServerService, public language: LanguageService, public tourService: TourService) { }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourView;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourView;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.getTour();
  }

  getTour() {
    this.isLoading = true;
    this.server.getTour(this.tourId).subscribe(res => {
      if (res.data) {
        this.tourModel = res.data;
      }
      this.isLoading = false;
    });
  }
}
