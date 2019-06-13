import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServerService } from 'src/app/core/services/server.service';
import { ProvinceCity } from 'src/app/model/province-city.model';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  public addLocationForm: FormGroup;
  public locationImage: File = null;
  public arrProvince: Array<ProvinceCity> = [];

  public isLoading: Boolean = false;
  public addLocationMessage: String = '';
  public hasError: Boolean = false;

  constructor(public language: LanguageService, private provinceService: ProvinceCityService, private formBuilder: FormBuilder,
    private server: ServerService) { }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compAddTour;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compAddTour;
      this.commonLanguage = this.language.currentLanguage.common;
    });

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

    this.buildAddLocationForm();
  }

  buildAddLocationForm() {
    this.addLocationForm = this.formBuilder.group({
      locationName: [null, [Validators.required]],
      provinceCity: [null, [Validators.required]],
      gps: [null],
      address: [null, [Validators.required]],
      image: ['']
    });
  }

  onLocationImagePicked(event: any) {
    this.locationImage = (event.target as HTMLInputElement).files[0];
  }

  addLocation() {
    if (this.addLocationForm.valid) {
      this.isLoading = true;
      const formData = this.addLocationForm.value;

      this.server.uploadImage([{ imgFile: this.locationImage, contentId: 'locationImg' }])
        .subscribe(uploadRes => {
          if (uploadRes) {
            this.server.postLocation(formData.locationName, formData.provinceCity,
              formData.gps, formData.address, uploadRes.imageUrls[0])
              .subscribe((res) => {
                if (res.statusCode === 201) {
                  this.addLocationMessage = this.compLanguage.addTourAddSuccess;
                  this.hasError = false;
                } else {
                  this.addLocationMessage = this.compLanguage.addTourAddFail;
                  this.hasError = true;
                }
                this.isLoading = false;
              });
          } else {
            this.addLocationMessage = this.compLanguage.addTourAddFail;
            this.hasError = true;
            this.isLoading = false;
          }
        });
    }
  }
}
