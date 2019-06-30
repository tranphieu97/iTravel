import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
// tslint:disable-next-line:max-line-length
import { NgbDateStruct, NgbModal, NgbTimeStruct, NgbTimepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { ServerService } from 'src/app/core/services/server.service';
import { Location } from 'src/app/model/location.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StepperService } from 'src/app/core/services/stepper.service';
import { DateStructService } from 'src/app/core/services/date-struct.service';
import { AddTourService } from 'src/app/core/services/add-tour.service';
import { Tour } from 'src/app/model/tour.model';
import { TourSchedule } from 'src/app/model/tour-schedule.model';
import { TourPreparation } from 'src/app/model/tour-preparation.model';
import { TourReviewer } from 'src/app/model/tour-reviewer.model';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class AddTourComponent implements OnInit, OnDestroy {

  public startDate: NgbDate;
  public endDate: NgbDate;
  public feedbackDeadline: NgbDate;
  public registerDeadline: NgbDate;
  public today: NgbDate;
  public startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public feedbackTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public registerTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  public arrProvince: Array<ProvinceCity> = [];
  public arrSelectedProvince: Array<ProvinceCity> = [];

  public searchLocationName: String = '';
  public arrLocations: Array<Location> = [];
  public arrFilterLocations: Array<Location> = [];
  public arrSelectedLocation: Array<Location> = [];

  public arrTourguides: Array<any> = [];
  public arrSelectedTourguide: Array<any> = [];

  public arrReviewer: Array<any> = [];
  public arrSelectedReviewer: Array<any> = [];

  public isCreating: Boolean = false;
  public isLoading: Boolean = false;

  public errorMess: String = '';

  public tourModel: Tour;

  public coverFile: File = null;
  public scheduleCost: number;

  compLanguage;
  commonLanguage;
  logoutSubscription;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig,
    private provinceService: ProvinceCityService, private server: ServerService, private modal: NgbModal,
    private formBuilder: FormBuilder, public stepperService: StepperService, private dateStructService: DateStructService,
    public addTourService: AddTourService, private userService: UserService, private router: Router) {
    timepickerConfig.spinners = false;
    timepickerConfig.seconds = false;
  }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compAddTour;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compAddTour;
      this.commonLanguage = this.language.currentLanguage.common;
    });
    this.logoutSubscription = this.userService.hasChangeUser.subscribe(() => {
      this.router.navigate(['/home']);
    });

    this.addTourService.setupTour();
    this.stepperService.setMaxStep(4);

    this.tourModel = this.addTourService.tourModel;

    const now = new Date();
    this.today = this.dateStructService.getDateStructFromDate(now);
    this.startDate = this.dateStructService.getDateStructFromDate(new Date(now.getTime() + (7 * (1000 * 60 * 60 * 24))));
    this.endDate = this.dateStructService.getDateStructFromDate(new Date(now.getTime() + (7 * (1000 * 60 * 60 * 24))));
    this.feedbackDeadline = this.dateStructService.getDateStructFromDate(now);
    this.registerDeadline = this.dateStructService.getDateStructFromDate(new Date(now.getTime() + (1 * (1000 * 60 * 60 * 24))));

    if (this.provinceService.allProvinceCity.length === 0) {
      this.provinceService.getAllProvinceCity().subscribe((res) => {
        this.provinceService.allProvinceCity = res.data.sort((provinceA, provinceB) => {
          if (provinceA.provinceName > provinceB.provinceName) {
            return 1;
          } else { return -1; }
        });
        this.arrProvince = Object.assign(this.provinceService.allProvinceCity);
      });
    } else {
      this.arrProvince = this.provinceService.allProvinceCity;
    }

    this.server.getTourguides().subscribe((res) => {
      this.arrTourguides = res.data.map((item: any) => {
        return {
          _id: item._id,
          displayName: item.lastName === '' ? item.firstName : item.lastName + ' ' + item.firstName,
          username: item.username
        };
      });
      this.arrTourguides.sort((userA, userB) => {
        if (userA.displayName[0] < userB.displayName[0]) {
          return -1;
        } else {
          return 1;
        }
      });
    });

    this.server.getReviewer().subscribe(res => {
      this.arrReviewer = res.data.map((item: any) => {
        return {
          _id: item._id,
          displayName: item.lastName === '' ? item.firstName : item.lastName + ' ' + item.firstName,
          username: item.username
        };
      });
    });

    this.addTourService.hasRemoveSchedule.subscribe((index) => {
      if (this.tourModel.schedules && this.tourModel.schedules.length > index && index >= 0) {
        this.tourModel.schedules.splice(index, 1);
      }
    });

    this.scheduleCost = 0;
    this.addTourService.hasChangeCost.subscribe(() => {
      this.scheduleCost = 0;
      this.tourModel.schedules.forEach(schedule => {
        this.scheduleCost = this.scheduleCost + schedule.cost;
      });
    });

    this.addTourService.hasRemovePreparation.subscribe((index) => {
      if (this.tourModel.preparations && this.tourModel.preparations.length > index && index >= 0) {
        this.tourModel.preparations.splice(index, 1);
      }
    });
  }

  ngOnDestroy() {
    this.logoutSubscription.unsubscribe();
  }

  selectProvince(province: ProvinceCity) {
    if (this.arrSelectedProvince.indexOf(province) === -1) {
      this.arrSelectedProvince.push(province);
      this.getLocationsInSelectedProvinces();
    }
  }

  removeProvince(province: ProvinceCity) {
    if (this.arrSelectedProvince.indexOf(province) !== -1) {
      this.arrSelectedProvince.splice(this.arrSelectedProvince.indexOf(province), 1);
      this.getLocationsInSelectedProvinces();
    }
  }

  getLocationsInSelectedProvinces() {
    if (this.arrSelectedProvince.length > 0) {
      this.server.getLocationsInProvinces(this.arrSelectedProvince.map(province => province.provinceName))
        .subscribe((res) => {
          if (res.data) {
            this.arrLocations = res.data.map(location => {
              const mapLocation = new Location(location.locationName, location.provinceCity, location.gps, location.address);
              mapLocation._id = location._id;
              return mapLocation;
            });

            this.arrFilterLocations = Object.assign(this.arrLocations);
          }
        });
    } else {
      this.arrLocations = [];
      this.arrFilterLocations = [];
    }
  }

  selectItem(arr: Array<any>, item: any) {
    if (arr.indexOf(item) === -1) {
      arr.push(item);
    }
  }

  removeItem(arr: Array<any>, item: any) {
    if (arr.indexOf(item) !== -1) {
      arr.splice(arr.indexOf(item), 1);
    }
  }

  changeArrReviewer(reviewer: any) {
    if (this.arrSelectedReviewer.includes(reviewer)) {
      this.arrSelectedReviewer.splice(this.arrSelectedReviewer.indexOf(reviewer), 1);
    } else {
      this.arrSelectedReviewer.push(reviewer);
    }

    this.tourModel.reviewers = this.arrSelectedReviewer.map(user => {
      return new TourReviewer(user._id);
    });
  }

  validateStartEndDate() {
    try {
      if (this.startDate && this.endDate
        && this.dateStructService.getDateFromDateStruct(this.startDate) > this.dateStructService.getDateFromDateStruct(this.endDate)) {
        this.endDate = this.startDate;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  addShedule() {
    try {
      if (this.tourModel.schedules === undefined) {
        this.tourModel.schedules = [];
      }

      this.tourModel.schedules.push(new TourSchedule());
    } catch (ex) {
      console.log(ex);
    }
  }

  addPreparation() {
    try {
      if (this.tourModel.preparations === undefined) {
        this.tourModel.preparations = [];
      }

      this.tourModel.preparations.push(new TourPreparation());
    } catch (ex) {
      console.log(ex);
    }
  }

  openNewLocationDialog(contentId) {
    // this.buildAddLocationForm();
    // this.addLocationMessage = '';
    // this.hasError = false;
    this.modal.open(contentId, { ariaLabelledBy: 'modal-basic-title' });
  }

  onCoverPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.tourModel.cover = reader.result.toString();
    };
    reader.readAsDataURL(file);
    this.coverFile = file;

    // // reset the <input> file for the next time
    // (event.target as HTMLInputElement).value = '';
  }

  removeCover() {
    this.coverFile = null;
    this.tourModel.cover = '';
  }

  showError(mess: string) {
    this.errorMess = mess;

    setTimeout(() => {
      this.errorMess = '';
    }, 5000);
  }

  filterLocation(keyword: any) {
    if (keyword !== undefined && keyword !== null) {
      this.arrFilterLocations = Object.assign(this.arrLocations
        .filter(x => x.locationName.toLowerCase().includes(keyword.trim().toLowerCase())));
    } else {
      this.arrFilterLocations = this.arrLocations;
    }
  }

  validatePage() {
    if (this.stepperService.getStep() === 1) {
      if (this.tourModel.tourName.trim() === '' || this.tourModel.description.trim() === ''
        || this.arrSelectedLocation.length === 0 || this.arrSelectedTourguide.length === 0
        || this.tourModel.cover === '') {

        // PAGE 1 - INVALID
        this.showError(this.compLanguage.addTourInputAllBefore);
      } else {
        // PAGE 1 - VALID

        // Store data to model
        this.tourModel.beginTime = this.dateStructService.getDateFromDateTimeStruct(this.startDate, this.startTime);
        this.tourModel.endTime = this.dateStructService.getDateFromDateTimeStruct(this.endDate, this.endTime);
        this.tourModel.closeFeedbackTime = this.dateStructService.getDateFromDateTimeStruct(this.feedbackDeadline, this.feedbackTime);
        this.tourModel.closeRegisterTime = this.dateStructService.getDateFromDateTimeStruct(this.registerDeadline, this.registerTime);
        // tslint:disable-next-line: max-line-length
        this.tourModel.durationTime = ((this.dateStructService.getDateFromDateStruct(this.endDate).valueOf() - this.dateStructService.getDateFromDateStruct(this.startDate).valueOf()) / 86400000) + 1;
        this.tourModel.locationIds = this.arrSelectedLocation.map(x => x._id);

        // Pass data to next page
        this.addTourService.setArrPerform(this.arrSelectedTourguide);

        if (this.tourModel.schedules.length === 0) {
          this.tourModel.schedules.push(new TourSchedule());
        }

        this.stepperService.toNext();
      }
    } else if (this.stepperService.getStep() === 2) {
      if (!this.addTourService.validateSchedule()) {
        // PAGE 2 - INVALID
        this.showError(this.compLanguage.addTourInputScheduleBefore);
      } else {
        // PAGE 2 - VALID
        if (this.tourModel.preparations.length === 0) {
          this.tourModel.preparations.push(new TourPreparation());
        }

        this.addTourService.sortTourSchedule();
        this.errorMess = '';
        this.stepperService.toNext();
      }
    } else if (this.stepperService.getStep() === 3) {
      if (this.tourModel.registerCost === null || this.tourModel.registerCost < 0
        || this.tourModel.memberLimit === null || this.tourModel.memberLimit < 1) {
        // PAGE 3 - INVALID
        this.showError(this.compLanguage.addTourInputAllBefore);
      } else if (!this.addTourService.validatePreparations()) {
        // PAGE 3 - INVALID
        this.showError(this.compLanguage.addTourInputPreparationBefore);
      } else {
        // PAGE 3 - VALID
        this.errorMess = '';
        this.stepperService.toNext();
      }
    }
  }

  validTour(): Boolean {
    try {
      if (this.tourModel.tourName.trim() !== '' && this.tourModel.description.trim() !== ''
        && this.tourModel.endTime > this.tourModel.beginTime && this.tourModel.beginTime > this.tourModel.closeRegisterTime
        && this.tourModel.closeRegisterTime > this.tourModel.closeFeedbackTime
        && this.tourModel.cover !== ''
        && this.tourModel.schedules.length > 0
        && this.tourModel.locationIds.length > 0
        && this.tourModel.memberLimit !== null && this.tourModel.memberLimit > 0
        && this.tourModel.registerCost !== null && this.tourModel.registerCost > 0
        && this.tourModel.reviewers.length > 0
        && this.tourModel.tourGuideId !== '' && this.tourModel.contactNumber !== '') {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  createTour() {
    if (this.validTour()) {
      this.isCreating = true;
      const tmpCover = this.tourModel.cover;

      this.server.uploadImage([{ imgFile: this.coverFile, contentId: 'locationImg' }])
        .subscribe((uploadRes) => {
          if (uploadRes.imageUrls && uploadRes.imageUrls[0]) {
            this.tourModel.cover = uploadRes.imageUrls[0];
            this.tourModel.creationTime = new Date();
            this.tourModel.createdBy = this.userService.getUserId();

            this.server.createTour(this.tourModel)
              .subscribe((res) => {
                this.isCreating = false;

                if (res.statusCode === 201) {
                  this.router.navigate(['tours/manager']);
                } else {
                  this.tourModel.cover = tmpCover;
                  this.showError(this.compLanguage.addTourAddError);
                }
              });
          } else {
            this.isCreating = false;
            this.showError(this.compLanguage.addTourAddError);
          }
        });
    }
  }
}
