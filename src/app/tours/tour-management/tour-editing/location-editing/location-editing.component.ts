import { Component, OnInit, Input } from '@angular/core';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { TourService } from 'src/app/core/services/tour.service';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { Location } from 'src/app/model/location.model';
import { ServerService } from 'src/app/core/services/server.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-location-editing',
  templateUrl: './location-editing.component.html',
  styleUrls: ['./location-editing.component.scss']
})
export class LocationEditingComponent implements OnInit {

  @Input() locationIds: Array<string>;

  public arrProvince: Array<ProvinceCity> = [];
  public selectedProvince: string;
  public arrLocations: Array<Location> = [];

  public isLoadingLocation: Boolean = false;

  compLanguage;
  commonLanguage;

  constructor(private provinceService: ProvinceCityService, public language: LanguageService, public tourService: TourService,
    private server: ServerService, private modal: NgbModal) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourEditing;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourEditing;
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
  }

  getLocationsInSelectedProvinces() {
    if (this.selectedProvince.length) {
      this.isLoadingLocation = true;
      this.server.getLocationsInProvinces([this.selectedProvince])
        .subscribe((res) => {
          if (res.data) {
            this.arrLocations = res.data.map(location => {
              const mapLocation = new Location(location.locationName, location.provinceCity, location.gps, location.address);
              mapLocation._id = location._id;
              return mapLocation;
            });
          }
          this.isLoadingLocation = false;
        });
    } else {
      this.arrLocations = [];
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

  openNewLocationDialog(contentId) {
    this.modal.open(contentId, { ariaLabelledBy: 'modal-basic-title' });
  }
}
