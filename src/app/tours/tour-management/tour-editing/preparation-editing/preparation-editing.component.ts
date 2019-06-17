import { Component, OnInit, Input } from '@angular/core';
import { TourPreparation } from 'src/app/model/tour-preparation.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TourPreparationPerformer } from 'src/app/model/tour-preparation-performer.model';
import { LanguageService } from 'src/app/core/services/language.service';
import { DateStructService } from 'src/app/core/services/date-struct.service';
import { EditTourService } from 'src/app/core/services/edit-tour.service';

@Component({
  selector: 'app-preparation-editing',
  templateUrl: './preparation-editing.component.html',
  styleUrls: ['./preparation-editing.component.scss']
})
export class PreparationEditingComponent implements OnInit {

  @Input() preparationModel: TourPreparation;
  @Input() index: number;

  public arrPerforms: Array<any>;
  public isCheckedAllMember: Boolean = true;

  public preparationDeadline: NgbDate;
  public maxDate: NgbDate;
  public hasFinishedInput: Boolean = true;

  public isInvalidDate: Boolean = false;

  compLanguage;
  commonLanguage;
  constructor(public language: LanguageService, private dateStructService: DateStructService, private editTourService: EditTourService) { }

  ngOnInit() {
    this.setupDefault();
    this.compLanguage = this.language.currentLanguage.compAddPreparation;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compAddPreparation;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.arrPerforms = this.editTourService.getArrPerforms().map((performer: any) => {
      return {
        displayName: performer.displayName,
        _id: performer._id,
        username: performer.username,
        amount: 0
      };
    });

    this.arrPerforms.forEach(itemPerformer => {
      const existPerform = this.preparationModel.performers.findIndex(performer => {
        return performer.performerId === itemPerformer._id;
      });
      if (existPerform !== -1) {
        itemPerformer.amount = this.preparationModel.performers[existPerform].needPrepare;
      }
    });
  }

  setupDefault() {
    this.preparationDeadline = this.dateStructService.getDateStructFromDate(this.editTourService.getBeginTime());
    this.maxDate = this.dateStructService.getDateStructFromDate(this.editTourService.getBeginTime());
    this.onChangeDeadline();

    // After click new preparation
    if (this.preparationModel.itemName === '') {
      this.hasFinishedInput = false;
    }
  }

  removePreparation() {
    this.editTourService.hasRemovePreparation.next(this.index);
  }

  onChangeDeadline() {
    this.preparationModel.deadline = this.dateStructService.getDateFromDateStruct(this.preparationDeadline);
  }

  onSelectPerform() {
    if (this.preparationModel.isRequired) {
      this.preparationModel.performers = [];
    }
  }

  onChangePerformerAmountItem() {
    this.preparationModel.performers = [];

    this.arrPerforms.forEach(performer => {
      if (performer.amount > 0) {
        this.preparationModel.performers.push(new TourPreparationPerformer(performer._id, performer.amount));
      }
    });
  }

  finishedPreparation() {
    if (this.preparationModel.itemName === null || this.preparationModel.itemName.trim() === '') {
      this.isInvalidDate = true;
    } else {
      this.hasFinishedInput = true;
    }
    console.log(this.preparationModel);
  }
}
