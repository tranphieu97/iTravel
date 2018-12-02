import { Injectable } from '@angular/core';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceCityService {
  allProvinceCity: ProvinceCity[] = [];

  constructor(private http: HttpClient, private server: ServerService) { }

  getAllProvinceCity() {
    return this.server.getListProvinceCity();
      // .subscribe((resData) => {
      //   if (resData.data) {
      //     this.allProvinceCity = resData.data;
      //   }
      //   // else err handling
      // });
  }
}
