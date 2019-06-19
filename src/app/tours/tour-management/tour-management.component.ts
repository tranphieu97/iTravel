import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/core/services/server.service';
import { Tour } from 'src/app/model/tour.model';
import { ConstTourStatus } from '../../constants';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { TourEditingComponent } from './tour-editing/tour-editing.component';
import { ReopenModalComponent } from './reopen-modal/reopen-modal.component';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.scss']
})
export class TourManagementComponent implements OnInit {
  tours: Tour[];
  tourStatus: ConstTourStatus = new ConstTourStatus();
  tourGuides = [];
  compLanguage;

  constructor(
    public languageService: LanguageService,
    private server: ServerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
    this.refreshListTour();
  }

  getTourGuide() {
    this.tours.forEach((tour, index) => {
      this.server.getUserBasicInfo(tour.tourGuideId).subscribe(resData => {
        if (resData.data) {
          this.tourGuides[index] = resData.data;
        }
      });
    });
  }

  refreshListTour = () => {
    this.server.getTours().subscribe(res => {
      this.tours = res.data ? res.data : [];
      this.tourGuides = this.tours.map(tour => ({
        firstName: '',
        lastName: ''
      }));
      this.getTourGuide();
    });
  }

  openDetail(tour: Tour) {
    const modalRef = this.modalService.open(DetailModalComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.tourData = tour;
  }

  openEdit(tour: Tour) {
    const modalRef = this.modalService.open(TourEditingComponent, {
      centered: true,
      size: 'lg'
    });

    modalRef.componentInstance.tourData = tour;
  }

  openReopen(tour: Tour) {
    const modalRef = this.modalService.open(ReopenModalComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.tourData = tour;
    modalRef.componentInstance.refresh = this.refreshListTour;
  }
}
