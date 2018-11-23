import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/model/location.model';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  @Input() location: Location = new Location('', [], '', '');
  allProvCity: ProvinceCity[] = [];
  allLocations: Location[] = [];

  constructor(private provCityService: ProvinceCityService, private serverService: ServerService) { }

  ngOnInit() {
    // call service to get all province-city
    this.provCityService.getAllProvinceCity(); // subcribed before
    // call service to get all location
    this.serverService.getListLocations().subscribe((resData) => {
      this.allLocations = resData.data;
    });
    this.allProvCity = this.provCityService.allProvinceCity;
  }

}
