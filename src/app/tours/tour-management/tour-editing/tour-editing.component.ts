import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/core/services/language.service';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/core/services/server.service';
import { TourSchedule } from 'src/app/model/tour-schedule.model';
import { TourPreparation } from 'src/app/model/tour-preparation.model';
import { EditTourService } from 'src/app/core/services/edit-tour.service';

@Component({
  selector: 'app-tour-editing',
  templateUrl: './tour-editing.component.html',
  styleUrls: ['./tour-editing.component.scss']
})
export class TourEditingComponent implements OnInit {

  @Input() tourData: Tour;

  public tourModel: Tour;
  public isLoading: Boolean = true;
  public isUploadingImg: Boolean = false;
  public isUpdating: Boolean = false;
  public scheduleCost: Number = 0;

  public arrTourguide: Array<any>;

  compLanguage;
  commonLanguage;

  constructor(public activeModal: NgbActiveModal, private language: LanguageService, private router: Router,
    private editTourService: EditTourService, private server: ServerService) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourEditing;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourEditing;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    // Copy tour data to different variable
    this.tourModel = JSON.parse(JSON.stringify(this.tourData));

    this.editTourService.setEditingTour(this.tourModel);
    this.scheduleCost = this.editTourService.getSheduleCost();

    this.editTourService.hasRemoveSchedule.subscribe((index) => {
      if (this.tourModel.schedules && this.tourModel.schedules.length > index && index >= 0) {
        this.tourModel.schedules.splice(index, 1);
      }
    });
    this.editTourService.hasRemovePreparation.subscribe((index) => {
      if (this.tourModel.preparations && this.tourModel.preparations.length > index && index >= 0) {
        this.tourModel.preparations.splice(index, 1);
      }
    });

    this.editTourService.hasChangeCost.subscribe(() => {
      this.scheduleCost = this.editTourService.getSheduleCost();
    });

    this.arrTourguide = this.editTourService.getArrPerforms();
    if (this.arrTourguide.length === 0) {
      setTimeout(() => {
        this.arrTourguide = this.editTourService.getArrPerforms();
      }, 3000);
    }
  }

  addShedule() {
    try {
      this.tourModel.schedules.push(new TourSchedule());
    } catch (ex) {
      console.log(ex);
    }
  }

  addPreparation() {
    try {
      this.tourModel.preparations.push(new TourPreparation());
    } catch (ex) {
      console.log(ex);
    }
  }

  onCoverPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.isUploadingImg = true;
    this.server.uploadImage([{imgFile: file, contentId: 'cover'}]).subscribe(res => {
      if (res.imageUrls && res.imageUrls[0]) {
        this.tourModel.cover = res.imageUrls[0];
      }
      this.isUploadingImg = false;
    });
  }
}
