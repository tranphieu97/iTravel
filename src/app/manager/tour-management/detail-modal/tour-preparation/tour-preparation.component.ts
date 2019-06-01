import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourPreparationStatus } from 'src/app/constants';

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

  constructor(private languageService: LanguageService) {}

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
    // update preparation status
    if (
      needUpdatePreparation &&
      this.getPrepared(needUpdatePreparation.performers) >=
        needUpdatePreparation.amount
    ) {
      needUpdatePreparation.status = this.PREPARE_STATUS.FINISHED;
    } else {
      needUpdatePreparation.status = this.PREPARE_STATUS.PREPARING;
    }
    // update status before update server
    // if(this.tourData.preparations.every(prepareItem => prepareItem.status === this.PREPARE_STATUS.FINISHED)){
    //   this.tourData.preparations
    // }
    console.log(this.tourData.preparations[0]._id);
  }

  getPrepared(performers: TourPreparationPerformer[]) {
    return performers.reduce((outputValue, eachPerformer) => {
      return (outputValue += eachPerformer.prepared);
    }, 0);
  }
}
