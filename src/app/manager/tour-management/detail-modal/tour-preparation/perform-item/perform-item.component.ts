import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourPreparationStatus } from 'src/app/constants';

@Component({
  selector: 'app-perform-item',
  templateUrl: './perform-item.component.html',
  styleUrls: ['./perform-item.component.scss']
})
export class PerformItemComponent implements OnInit {
  @Input() performer: TourPreparationPerformer;
  @Input() preparationId: string;
  @Input() updatePreparation;
  @ViewChild('inputEle') inputEleRef: ElementRef;
  basicInfo;
  isEditing = false;
  compLanguage;
  PREPARE_STATUS = new ConstTourPreparationStatus();

  constructor(
    private serverService: ServerService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // this.performer.prepared
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
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
    const newPrepared = this.inputEleRef.nativeElement.value;
    if (newPrepared === '') {
      return;
    }
    // update prepared and status on client
    this.performer.prepared = Number(newPrepared);
    if (this.performer.prepared >= this.performer.needPrepare) {
      this.performer.status = this.PREPARE_STATUS.FINISHED;
    } else {
      this.performer.status = this.PREPARE_STATUS.PREPARING;
    }
    this.updatePreparation(this.preparationId);
  }

  onInputPrepared(input: HTMLInputElement) {
    input.value = input.value.replace(/\D/gi, '').slice(0, 4);
  }
}
