import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-perform-item',
  templateUrl: './perform-item.component.html',
  styleUrls: ['./perform-item.component.scss']
})
export class PerformItemComponent implements OnInit {
  @Input() performer: TourPreparationPerformer;
  @Input() tourId: string;
  basicInfo;
  isEditing = false;
  @ViewChild('inputEle') inputEleRef: ElementRef;

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

  onClickEdit() {
    this.isEditing = true;
  }

  onClickSave() {
    this.isEditing = false;
    if (!this.inputEleRef.nativeElement.value) {
      return;
    }
    // update database
  }

  onInputPrepared(input: HTMLInputElement) {
    input.value = input.value.replace(/\D/gi, '').slice(0, 4);
  }
}
