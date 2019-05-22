import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { TourPreparation } from 'src/app/model/tour-preparation.model';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';

@Component({
  selector: 'app-tour-preparation',
  templateUrl: './tour-preparation.component.html',
  styleUrls: ['./tour-preparation.component.scss']
})
export class TourPreparationComponent implements OnInit {
  @Input() tourData: Tour;
  collapsedStates = [];
  constructor() {}

  ngOnInit() {
    this.collapsedStates = this.tourData.preparations.map(preparationItem => ({
      preparationItem: preparationItem._id,
      collapsed: true
    }));
  }

  getPrepared(performers: TourPreparationPerformer[]) {
    return performers.reduce((outputValue, eachPerformer) => {
      return (outputValue += eachPerformer.prepared);
    }, 0);
  }
}
