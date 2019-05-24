import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/core/services/server.service';
import { ConstantService } from 'src/app/core/services/constant.service';
import { FormBuilder } from '@angular/forms';
import { Tour } from 'src/app/model/tour.model';
import { ConstTourStatus } from '../../constants';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

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
    public language: LanguageService,
    private calendar: NgbCalendar,
    private server: ServerService,
    private modalService: NgbModal,
    public constant: ConstantService,
    private formBuilder: FormBuilder
  ) {}

  getTourGuide() {
    this.tours.forEach((tour, index) => {
      this.server.getUserBasicInfo(tour.tourGuideId).subscribe(resData => {
        if (resData.data) {
          this.tourGuides[index] = resData.data;
        }
      });
    });
  }

  ngOnInit() {
    // test get tour
    // this.server.getTour('5cb4744b393d6515e4757a0a').subscribe(res => console.log(res))

    this.server.getTours().subscribe(res => {
      this.tours = res.data ? res.data : [];
      this.tourGuides = this.tours.map(tour => ({
        firstName: '',
        lastName: ''
      }));
      this.getTourGuide();
    });

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

  openDetail(tour: Tour) {
    const modalRef = this.modalService.open(DetailModalComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.tourData = tour;
  }
}
