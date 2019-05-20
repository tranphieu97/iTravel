import { Component, OnInit, Input } from '@angular/core';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';

@Component({
  selector: 'app-perform-item',
  templateUrl: './perform-item.component.html',
  styleUrls: ['./perform-item.component.scss']
})
export class PerformItemComponent implements OnInit {
  @Input() performer: TourPreparationPerformer;

  constructor() {}

  ngOnInit() {}
}
