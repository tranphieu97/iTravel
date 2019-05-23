import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class AddTourComponent implements OnInit {

  public addLocationForm: FormGroup;

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
  public arrSelectedLocation: Array<Location> = [];

  public arrTourguides: Array<any> = [];
  public arrSelectedTourguide: Array<any> = [];

  public isLoading: Boolean = false;
  public addLocationMessage: String = '';
  public hasError: Boolean = false;

  public errorMess: String = '';

  public tourModel: Tour;

  public coverFile: File = null;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig,
    private provinceService: ProvinceCityService, private serverService: ServerService, private modal: NgbModal,
    private formBuilder: FormBuilder, public stepperService: StepperService, private dateStructService: DateStructService,
    public addTourService: AddTourService) {
    timepickerConfig.spinners = false;
    timepickerConfig.seconds = false;
  }

  ngOnInit() {
    this.addTourService.setupTour();
    this.stepperService.setMaxStep(3);

    this.tourModel = this.addTourService.tourModel;

    const now = new Date();
    this.today = this.dateStructService.getDateStructFromDate(now);
    this.startDate = this.dateStructService.getDateStructFromDate(new Date(now.getTime() + (7 * (1000 * 60 * 60 * 24))));
    this.endDate = this.dateStructService.getDateStructFromDate(new Date(now.getTime() + (7 * (1000 * 60 * 60 * 24))));
    this.feedbackDeadline = this.dateStructService.getDateStructFromDate(now);
    this.registerDeadline = this.dateStructService.getDateStructFromDate(new Date(now.getTime() + (1 * (1000 * 60 * 60 * 24))));

    if (this.provinceService.allProvinceCity.length === 0) {
      this.provinceService.getAllProvinceCity().subscribe((res) => {
        this.provinceService.allProvinceCity = res.data;
        this.arrProvince = res.data;
      });
    } else {
      this.arrProvince = this.provinceService.allProvinceCity;
    }

    this.serverService.getTourguides().subscribe((res) => {
      this.arrTourguides = res.data.map((item: any) => {
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
  }

  buildAddLocationForm() {
    this.addLocationForm = this.formBuilder.group({
      locationName: [null, [Validators.required]],
      provinceCity: [null, [Validators.required]],
      gps: [null],
      address: [null, [Validators.required]],
    });
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
      this.serverService.getLocationsInProvinces(this.arrSelectedProvince.map(province => province.provinceName))
        .subscribe((res) => {
          if (res.data) {
            this.arrLocations = res.data.map(location =>
              new Location(location.locationName, location.provinceCity, location.gps, location.address));
          }
        });
    } else {
      this.arrLocations = [];
    }
  }

  addLocation() {
    if (this.addLocationForm.valid) {
      this.isLoading = true;
      const formData = this.addLocationForm.value;
      this.serverService.postLocation(formData.locationName, formData.provinceCity, formData.gps, formData.address)
        .subscribe((res) => {
          this.isLoading = false;

          if (res.statusCode === 201) {
            this.addLocationMessage = this.language.currentLanguage.addTourAddSuccess;
            this.hasError = false;

            setTimeout(() => {
              try {
                this.modal.dismissAll();
              } catch { }
            }, 2000);
          } else {
            this.addLocationMessage = this.language.currentLanguage.addTourAddFail;
            this.hasError = true;
          }
        });
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

    console.log(this.addTourService.tourModel);
  }

  openNewLocationDialog(contentId) {
    this.buildAddLocationForm();
    this.addLocationMessage = '';
    this.hasError = false;
    this.modal.open(contentId, { ariaLabelledBy: 'modal-basic-title' });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.tourModel.cover = reader.result.toString();
    };
    reader.readAsDataURL(file);
    this.coverFile = file;

    // reset the <input> file for the next time
    (event.target as HTMLInputElement).value = '';
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

  validatePage() {
    if (this.stepperService.getStep() === 1) {
      if (this.tourModel.tourName.trim() === '' || this.tourModel.description.trim() === ''
        || this.arrSelectedLocation.length === 0 || this.arrSelectedTourguide.length === 0
        || this.tourModel.cover === '') {
        this.showError(this.language.currentLanguage.addTourInputAllBefore);
      } else {
        this.tourModel.beginTime = this.dateStructService.getDateFromDateTimeStruct(this.startDate, this.startTime);
        this.tourModel.endTime = this.dateStructService.getDateFromDateTimeStruct(this.endDate, this.endTime);
        this.tourModel.closeFeedbackTime = this.dateStructService.getDateFromDateTimeStruct(this.feedbackDeadline, this.feedbackTime);
        this.tourModel.closeRegisterTime = this.dateStructService.getDateFromDateTimeStruct(this.registerDeadline, this.registerTime);
        this.addTourService.setArrPerform(this.arrSelectedTourguide);

        if (this.tourModel.schedules.length === 0) {
          this.tourModel.schedules.push(new TourSchedule());
        }

        this.stepperService.toNext();
      }
    } else if (this.stepperService.getStep() === 2) {
      this.stepperService.toNext();
    } else if (this.stepperService.getStep() === 3) {
      
    }
  }
}
