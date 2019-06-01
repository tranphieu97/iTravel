import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourPreparationStatus } from 'src/app/constants';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-tour-preparation',
  templateUrl: './tour-preparation.component.html',
  styleUrls: ['./tour-preparation.component.scss']
})
export class TourPreparationComponent implements OnInit {
  @Input() tourData: Tour;
  collapsedStates = [];
  compLanguage;
  PREPARE_STATUS = new ConstTourPreparationStatus();

  constructor(
    private languageService: LanguageService,
    private serverService: ServerService
  ) {}

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
    this.collapsedStates = this.tourData.preparations.map(preparationItem => ({
      preparationItem: preparationItem._id,
      collapsed: true
    }));
  }

  updatePreparation = (id: string) => {
    const needUpdatePreparation = this.tourData.preparations.find(
      preparation => preparation._id === id
    );
    // caculate preparation status
    if (
      needUpdatePreparation &&
      this.getPrepared(needUpdatePreparation.performers) >=
        needUpdatePreparation.amount
    ) {
      needUpdatePreparation.status = this.PREPARE_STATUS.FINISHED;
    } else {
      needUpdatePreparation.status = this.PREPARE_STATUS.PREPARING;
    }
    this.serverService
      .updateTourPreparation(
        {
          tourId: this.tourData._id,
          preparationId: id
        },
        {
          performers: needUpdatePreparation.performers,
          status: needUpdatePreparation.status
        }
      )
      .subscribe();
  }

  getPrepared(performers: TourPreparationPerformer[]) {
    return performers.reduce((outputValue, eachPerformer) => {
      return (outputValue += eachPerformer.prepared);
    }, 0);
  }
}
