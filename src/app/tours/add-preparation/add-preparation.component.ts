import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { TourPreparation } from 'src/app/model/tour-preparation.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateStructService } from 'src/app/core/services/date-struct.service';
import { AddTourService } from 'src/app/core/services/add-tour.service';

@Component({
  selector: 'app-add-preparation',
  templateUrl: './add-preparation.component.html',
  styleUrls: ['./add-preparation.component.scss']
})
export class AddPreparationComponent implements OnInit {

  @Input() preparationModel: TourPreparation;
  @Input() index: number;

  public arrPerforms: Array<any>;
  public isCheckedAllMember: Boolean = true;

  public preparationDeadline: NgbDate;
  public maxDate: NgbDate;
  public hasFinishedInput: Boolean = false;

  public isInvalidDate: Boolean = false;

  compLanguage;
  commonLanguage;

  constructor(public language: LanguageService, private dateStructService: DateStructService, private addTourService: AddTourService) { }

  ngOnInit() {
    this.setupDefault();
    this.compLanguage = this.language.currentLanguage.compAddPreparation;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compAddPreparation;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.arrPerforms = this.addTourService.getArrPerform();
  }

  setupDefault() {
    this.preparationModel = new TourPreparation();

    this.preparationDeadline = this.dateStructService.getDateStructFromDate(this.addTourService.getBeginTime());
    this.maxDate = this.dateStructService.getDateStructFromDate(this.addTourService.getBeginTime());
    this.onChangeDeadline();
  }

  removePreparation() {
    this.addTourService.hasRemovePreparation.next(this.index);
  }

  onChangeDeadline() {
    this.preparationModel.deadline = this.dateStructService.getDateFromDateStruct(this.preparationDeadline);
  }

  finishedPreparation() {
    if (this.preparationModel.itemName === null || this.preparationModel.itemName.trim() === '') {
      this.isInvalidDate = true;
    } else {
      this.hasFinishedInput = true;
    }
  }
}
