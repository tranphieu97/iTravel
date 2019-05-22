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

  public preparationDeadline: NgbDate;
  public maxDate: NgbDate;
  public hasFinishedInput: Boolean = false;

  constructor(public language: LanguageService, private dateStructService: DateStructService, private addTourService: AddTourService) { }

  ngOnInit() {
    this.setupDefault();
  }

  setupDefault() {
    this.preparationModel = new TourPreparation();

    this.preparationDeadline = this.dateStructService.getDateStructFromDate(this.addTourService.getBeginTime());
    this.maxDate = this.dateStructService.getDateStructFromDate(this.addTourService.getBeginTime());
  }

  removePreparation() {
    this.addTourService.hasRemovePreparation.next(this.index);
  }

  finishedPreparation() {

  }
}
