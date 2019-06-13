import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { Location } from 'src/app/model/location.model';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-tour-general-info',
  templateUrl: './tour-general-info.component.html',
  styleUrls: ['./tour-general-info.component.scss']
})
export class TourGeneralInfoComponent implements OnInit, AfterViewInit {
  @Input() tourData: Tour;
  locationsData: Location[] = [];

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
  }

  ngAfterViewInit() {
    this.tourData.locationIds.forEach((id, index) => {
      this.serverService
        .getOneLocation(id)
        .subscribe(res => (this.locationsData[index] = res.data));
    });
  }
}
