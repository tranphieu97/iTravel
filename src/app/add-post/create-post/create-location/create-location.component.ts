import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/model/location.model';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { ServerService } from 'src/app/core/services/server.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  // @Input() location: Location = new Location('', [], '', '');
  @Input() post: Post;
  allProvCity: ProvinceCity[] = [];
  allLocations: Location[] = [];

  constructor(private provCityService: ProvinceCityService, private serverService: ServerService) { }

  ngOnInit() {
    // call service to get all province - city
    if (this.provCityService.allProvinceCity.length > 0) {
      this.allProvCity = this.provCityService.allProvinceCity;
    } else {
      this.provCityService.getAllProvinceCity()
        .subscribe((resData) => {
          if (resData.data) {
            this.provCityService.allProvinceCity = resData.data;
            this.allProvCity = this.provCityService.allProvinceCity;
          }
          // else err handling
        });
    }
    // call server service to get all location bacause we dont have location-service
    this.serverService.getListLocations().subscribe((resData) => {
      this.allLocations = resData.data;
    });
  }

  onRemoveProvince(removedProvince: String) {
    // console.log(removedCategory);
    this.post.location.provinceCity = this.post.location.provinceCity.filter((eachEle) => {
      return eachEle !== removedProvince;
      // return eachEle._id !== removedCategory._id;
    });
  }

  onSelectProvince(selectedProvince: string) {
    // check list province if selected province is a new province
    const sameProvince = this.post.location.provinceCity.find((eachEle) => {
      return eachEle === selectedProvince;
    });
    // if is a new province => add the new
    if (sameProvince === null || sameProvince === undefined) {
      this.post.location.provinceCity.push(selectedProvince);
    }
  }

  onUpdatePlace(event: Event) {
    // validate here
    this.post.location.locationName = (event.target as HTMLInputElement).value;
  }

  onUpdateAddress(event: Event) {
    // validate here
    this.post.location.address = (event.target as HTMLInputElement).value;
  }
}
