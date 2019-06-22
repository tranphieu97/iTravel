import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Tour } from 'src/app/model/tour.model';
import { ConstTourStatus, ConstTourPreparationStatus } from 'src/app/constants';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalComponent } from 'src/app/tours/tour-management/detail-modal/detail-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-tour',
  templateUrl: './user-tour.component.html',
  styleUrls: ['./user-tour.component.scss']
})
export class UserTourComponent implements OnInit {
  tours: Tour[];
  tourStatus: ConstTourStatus = new ConstTourStatus();
  tourPreparationStatus = new ConstTourPreparationStatus();
  // tourGuides = [];
  compLanguage;

  constructor(
    private languageService: LanguageService,
    private userService: UserService,
    private serverService: ServerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.compUserTour;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compUserTour)
    );
    this.fetchTour();
  }

  fetchTour() {
    this.serverService.getToursByUser(true).subscribe(res => {
      if (res.data) {
        this.tours = res.data;
      }
    });
  }

  openDetail(tour: Tour) {
    const modalRef = this.modalService.open(DetailModalComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.tourData = tour;
  }

  openConfirmCancel(message: string, tour: Tour) {
    const confirmModalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true
    });
    // passing input
    confirmModalRef.componentInstance.message = message;
    confirmModalRef.componentInstance.onAccept = () => this.cancelTour(tour);
  }

  cancelTour(tour: Tour) {
    const currentUserId = this.userService.currentUser._id;
    let { schedules, preparations, members } = tour;
    // fix data before update
    schedules = schedules.map(schedule => {
      schedule.performerIds = schedule.performerIds.filter(performerId => performerId !== currentUserId);
      return schedule;
    });
    members = members.map(member => {
      if (member.memberId === currentUserId && !member.cancelTime) {
        member.cancelTime = new Date();
      }
      return member;
    });
    preparations = preparations.map(preparation => {
      preparation.performers = preparation.performers.filter(performer => performer.performerId !== currentUserId);
      if (preparation.status === this.tourPreparationStatus.PREPARING) {
        return preparation;
      }
      const totalPrepared = preparation.performers.reduce((total, currentPerformer) => total = total + currentPerformer.prepared, 0);
      if (totalPrepared < preparation.amount) {
        preparation.status = this.tourPreparationStatus.PREPARING;
      }
      return preparation;
    });
    // call update
    this.serverService.updateCancelTour(tour._id, { schedules, preparations, members }).subscribe((res => {
      if (res.message === 'Success') {
        this.fetchTour();
      }
    }));
  }
}
