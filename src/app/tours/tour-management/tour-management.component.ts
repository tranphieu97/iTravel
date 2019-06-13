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
    // test get tour
    // this.server.getTour('5cb4744b393d6515e4757a0a').subscribe(res => console.log(res))

    this.refreshListTour();
    // this.server.getTours().subscribe(res => {
    //   this.tours = res.data ? res.data : [];
    //   this.tourGuides = this.tours.map(tour => ({
    //     firstName: '',
    //     lastName: ''
    //   }));
    //   this.getTourGuide();
    // });

    // this.server.createTour({
    //   tourName: 'Nha Trang',
    //   locationIds: ['5cceb84120fd82043c8fd368', '5ccec2eb20fd82043c8fd37e'],
    //   registerCost: 100000,
    //   description: 'Phượt Nha Trang',
    //   tourGuideId: '5c1549456d860c330492cac7',
    //   contactNumber: '0323456789',
    //   creationTime: new Date(),
    //   beginTime: new Date(2019, 6, 1),
    //   endTime: new Date(2019, 6, 8),
    //   closeFeedbackTime: new Date(2020, 12, 1),
    //   closeRegisterTime: new Date(2021, 12, 1),
    //   durationTime: 7,
    //   memberLimit: 10,
    //   status: 'PENDING',
    //   isActive: true,
    //   schedules: [
    //     {
    //       beginTime: new Date(2019, 5, 12, 5),
    //       endTime: new Date(2019, 5, 12, 5, 15),
    //       location: 'Đại học Sư phạm Kỹ thuật',
    //       tasks: ['Tập trung'],
    //       cost: 0,
    //       performerIds: [
    //         '5c1549456d860c330492cac7',
    //         '5c9a5834c9a2893ec075a954',
    //         '5c2b4527150bd42cb82dbc23'
    //       ],
    //       note: 'Đúng giờ, đổ xăng đầy đủ',
    //       isActive: true
    //     },
    //     {
    //       beginTime: new Date(2019, 5, 12, 5),
    //       endTime: new Date(2019, 5, 12, 5, 15),
    //       location: 'Vinpearl Nha Trang',
    //       tasks: ['Du lịch Vinpearl'],
    //       cost: 800000,
    //       performerIds: [
    //         '5c1549456d860c330492cac7',
    //         '5c9a5834c9a2893ec075a954',
    //         '5c2b4527150bd42cb82dbc23'
    //       ],
    //       note: '',
    //       isActive: true
    //     }
    //   ],
    //   preparations: [
    //     {
    //       itemName: 'Xe',
    //       amount: 2,
    //       unit: 'cái',
    //       performers: [
    //         {
    //           performerId: '5c1549456d860c330492cac7',
    //           needPrepare: 1,
    //           prepared: 0,
    //           status: 'PREPARING'
    //         },
    //         {
    //           performerId: '5c9a5834c9a2893ec075a954',
    //           needPrepare: 1,
    //           prepared: 1,
    //           status: 'FINISHED'
    //         }
    //       ],
    //       status: 'PREPARING',
    //       deadline: new Date(),
    //       note: '',
    //       isActive: true
    //     },
    //     {
    //       itemName: 'Máy ảnh',
    //       amount: 1,
    //       unit: 'cái',
    //       performers: [
    //         {
    //           memberName: 'Phieu',
    //           amount: 1,
    //           status: 'FINISHED'
    //         }
    //       ],
    //       status: 'FINISHED',
    //       deadline: new Date(),
    //       note: 'Sạc đầy pin',
    //       isActive: true
    //     }
    //   ],
    //   feedbacks: [
    //     {
    //       from: '5c2b4527150bd42cb82dbc23',
    //       content: 'Đi Nha Trang nên đi bằng xe lớn',
    //       time: new Date(),
    //       isActive: true
    //     },
    //     {
    //       from: '5c9a5834c9a2893ec075a954',
    //       content: 'Nên có khâu kiểm tra giấy tờ xe các thành viên',
    //       time: new Date(),
    //       isActive: true
    //     }
    //   ],
    //   members: [
    //     {
    //       memberId: '5c1549456d860c330492cac7',
    //       cost: 100000,
    //       contactNumber: '0329999222'
    //     },
    //     {
    //       memberId: '5c2b4527150bd42cb82dbc23',
    //       cost: 100000,
    //       contactNumber: '0329999111'
    //     },
    //     {
    //       memberId: '5c9a5834c9a2893ec075a954',
    //       cost: 100000,
    //       contactNumber: '0329999333'
    //     }
    //   ]
    // }); // .subscribe(res => console.log(res))

    // this.server.updateTour({
    //   _id: '5cad37d09dd9538ef41b7555',
    //   tourName: 'new tour update ' + Date.now(),
    //   locations: ['place 1', 'place 2'],
    //   registerCost: 100000,
    // }).subscribe(res => console.log(res))
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
    modalRef.componentInstance.refresh = this.refreshListTour;
  }
}
