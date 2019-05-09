import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
// tslint:disable-next-line:max-line-length
import { NgbDateStruct, NgbModal, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { ServerService } from 'src/app/core/services/server.service';
import { Location } from 'src/app/model/location.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss'],
  providers: [NgbTimepickerConfig]
})
export class AddTourComponent implements OnInit {

  public addLocationForm: FormGroup;

  public startDate: NgbDateStruct;
  public endDate: NgbDateStruct;
  public startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public endTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  public arrProvince: Array<ProvinceCity> = [];
  public arrSelectedProvince: Array<ProvinceCity> = [];

  public searchLocationName: String = '';
  public arrLocations: Array<Location> = [];
  public arrSelectedLocation: Array<Location> = [];

  public isLoading: Boolean = false;
  public addLocationMessage: String = '';
  public hasError: Boolean = false;

  constructor(public language: LanguageService, private timepickerConfig: NgbTimepickerConfig,
    private provinceService: ProvinceCityService, private serverService: ServerService, private modal: NgbModal,
    private formBuilder: FormBuilder) {
    timepickerConfig.spinners = false;
    timepickerConfig.seconds = false;
  }

  ngOnInit() {
    if (this.provinceService.allProvinceCity.length === 0) {
      this.provinceService.getAllProvinceCity().subscribe((res) => {
        this.provinceService.allProvinceCity = res.data;
        this.arrProvince = res.data;
      });
    } else {
      this.arrProvince = this.provinceService.allProvinceCity;
    }
  }

  buildAddLocationForm() {
    this.addLocationForm = this.formBuilder.group({
      locationName: [null, [Validators.required]],
      provinceCity: [null, [Validators.required]],
      gps: [null],
      address: [null, [Validators.required]],
    });
  }

  /**
   * Select a province be going in tour
   * @param province
   */
  selectProvince(province: ProvinceCity) {
    if (this.arrSelectedProvince.indexOf(province) === -1) {
      this.arrSelectedProvince.push(province);

      this.getLocationsInSelectedProvinces();
    }
  }

  /**
   * Delete a selected province from array selected province
   * @param province
   */
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
              } catch {}
            }, 2000);
          } else {
            this.addLocationMessage = this.language.currentLanguage.addTourAddFail;
            this.hasError = true;
          }
        });
    }
  }

  selectLocation(location: Location) {
    if (this.arrSelectedLocation.findIndex(item => item.locationName === location.locationName) === -1) {
      this.arrSelectedLocation.push(location);
    }
  }

  removeLocation(location: Location) {
    if (this.arrSelectedLocation.indexOf(location) !== -1) {
      this.arrSelectedLocation.splice(this.arrSelectedLocation.indexOf(location), 1);
    }
  }

  openNewLocationDialog(contentId) {
    this.buildAddLocationForm();
    this.addLocationMessage = '';
    this.hasError = false;
    this.modal.open(contentId, { ariaLabelledBy: 'modal-basic-title' });
  }
}
