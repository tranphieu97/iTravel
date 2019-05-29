import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Tour } from 'src/app/model/tour.model';
import { ConstTourStatus } from 'src/app/constants';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalComponent } from 'src/app/manager/tour-management/detail-modal/detail-modal.component';

@Component({
  selector: 'app-user-tour',
  templateUrl: './user-tour.component.html',
  styleUrls: ['./user-tour.component.scss']
})
export class UserTourComponent implements OnInit {
  tours: Tour[];
  tourStatus: ConstTourStatus = new ConstTourStatus();
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
}
