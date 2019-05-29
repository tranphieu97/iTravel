import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-perform-item',
  templateUrl: './perform-item.component.html',
  styleUrls: ['./perform-item.component.scss']
})
export class PerformItemComponent implements OnInit {
  @Input() performer: TourPreparationPerformer;
  @Input() tourId: string;
  @ViewChild('inputEle') inputEleRef: ElementRef;
  basicInfo;
  isEditing = false;
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
