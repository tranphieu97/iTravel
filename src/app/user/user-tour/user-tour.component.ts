import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Tour } from 'src/app/model/tour.model';
import { ConstTourStatus, ConstTourPreparationStatus } from 'src/app/constants';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalComponent } from 'src/app/tours/tour-management/detail-modal/detail-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-tour',
  templateUrl: './user-tour.component.html',
  styleUrls: ['./user-tour.component.scss']
})
export class UserTourComponent implements OnInit, OnDestroy {
  tours: Tour[];
  tourStatus: ConstTourStatus = new ConstTourStatus();
  tourPreparationStatus = new ConstTourPreparationStatus();
  // tourGuides = [];

  isLoading: Boolean = true;
  page: Number = 1;
  pageSize: Number = 8;
  logoutSubscription;
  compLanguage;

  constructor(
    private languageService: LanguageService,
    private userService: UserService,
    private serverService: ServerService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.compUserTour;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compUserTour)
    );
    this.logoutSubscription = this.userService.hasChangeUser.subscribe(() => {
      this.router.navigate(['/home']);
    });
    this.fetchTour();
  }

  ngOnDestroy() {
    this.logoutSubscription.unsubscribe();
  }

  fetchTour() {
    this.isLoading = true;
    this.serverService.getToursByUser(true).subscribe(res => {
      this.tours = res.data ? res.data : [];
      this.tours.sort((tour1, tour2) => {
        if ((tour1.status === this.tourStatus.FINISHED && tour2.status === this.tourStatus.FINISHED)
          || (tour1.status !== this.tourStatus.FINISHED && tour2.status !== this.tourStatus.FINISHED)) {
          const tour1CreationTime = new Date(tour1.creationTime);
          const tour2CreationTime = new Date(tour2.creationTime);
          return tour1CreationTime > tour2CreationTime ? -1 : 1;
        } else {
          return tour1.status === this.tourStatus.FINISHED ? 1 : -1;
        }
      });
      this.isLoading = false;
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
