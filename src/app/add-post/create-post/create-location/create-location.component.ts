import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/model/location.model';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { ProvinceCity } from 'src/app/model/province-city.model';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  @Input() location: Location = new Location('', [], '', '');
  allProvCity: ProvinceCity[] = [];
  constructor(private provCityService: ProvinceCityService) { }

  ngOnInit() {
    // call service to get all province-city
    this.provCityService.getAllProvinceCity();
    this.allProvCity = this.provCityService.allProvinceCity;
    // call service to get all location
  }

}
