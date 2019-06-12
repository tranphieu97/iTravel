import { Component, OnInit, Input } from '@angular/core';
import {
  NgbActiveModal,
  NgbTimeStruct,
  NgbTimepickerConfig,
  NgbDate
} from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/core/services/language.service';
import { Tour } from 'src/app/model/tour.model';
import { DateStructService } from 'src/app/core/services/date-struct.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConstTourStatus } from 'src/app/constants';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-reopen-modal',
  templateUrl: './reopen-modal.component.html',
  styleUrls: ['./reopen-modal.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class ReopenModalComponent implements OnInit {
  @Input() tourData: Tour;
  @Input() refresh;
  public tourName: string;
  public today: NgbDate;
  public startDate: NgbDate;
  public startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endDate: NgbDate;
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public feedbackDeadline: NgbDate;
  public feedbackDeadlineTime: NgbTimeStruct = {
    hour: 0,
    minute: 0,
    second: 0
  };
  public registerDeadline: NgbDate;
  public registerDeadlineTime: NgbTimeStruct = {
    hour: 0,
    minute: 0,
    second: 0
  };
  compLanguage;
  STATUS = new ConstTourStatus();

  constructor(
    public activeModal: NgbActiveModal,
    private languageService: LanguageService,
    private timepickerConfig: NgbTimepickerConfig,
    private dateStructService: DateStructService,
    private userService: UserService,
    private serverService: ServerService
  ) {
    timepickerConfig.spinners = false;
    timepickerConfig.seconds = false;
  }

  ngOnInit() {
    this.today = this.dateStructService.getDateStructFromDate(new Date());
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
  }

  onReopenHandle() {
    const newTour = Object.assign(this.tourData, {
      tourName: this.tourName ? this.tourName : this.tourData.tourName,
      creationTime: new Date(),
      createdBy: this.userService.currentUser._id,
      beginTime: this.dateStructService.getDateFromDateTimeStruct(
        this.startDate,
        this.startTime
      ),
      endTime: this.dateStructService.getDateFromDateTimeStruct(
        this.endDate,
        this.endTime
      ),
      closeFeedbackTime: this.dateStructService.getDateFromDateTimeStruct(
        this.feedbackDeadline,
        this.feedbackDeadlineTime
      ),
      closeRegisterTime: this.dateStructService.getDateFromDateTimeStruct(
        this.registerDeadline,
        this.registerDeadlineTime
      ),
      status: this.STATUS.PENDING,
      reviewers: [],
      members: []
    });
    newTour.schedules = newTour.schedules.map(schedule => {
      delete schedule._id;
      schedule.performerIds = [];
      return schedule;
    });
    newTour.preparations = newTour.preparations.map(preparation => {
      delete preparation._id;
      preparation.performers = [];
      return preparation;
    });
    newTour.feedbacks = newTour.feedbacks.map(feedback => {
      delete feedback._id;
      return feedback;
    });
    delete newTour._id;
    this.serverService.createTour(newTour).subscribe(res => {
      if (res.statusCode === 201) {
        this.refresh();
      } else {
        alert(res.message);
      }
    });
    this.activeModal.close();
  }
}
