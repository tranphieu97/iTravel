import { Component, OnInit, Input } from '@angular/core';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-perform-item',
  templateUrl: './perform-item.component.html',
  styleUrls: ['./perform-item.component.scss']
})
export class PerformItemComponent implements OnInit {
  @Input() performer: TourPreparationPerformer;
  basicInfo;

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.serverService
      .getUserBasicInfo(this.performer.performerId)
      .subscribe(res => {
        if (res.data) {
          this.basicInfo = res.data;
        }
      });
  }
}
