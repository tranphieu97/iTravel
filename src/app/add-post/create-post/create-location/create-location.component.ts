import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/model/location.model';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { ServerService } from 'src/app/core/services/server.service';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/core/services/post.service';

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

  constructor(private provCityService: ProvinceCityService, private postService: PostService, private serverService: ServerService) { }

  ngOnInit() {
    // call service to get all province - city
    // if all province are already exist in provCityService, dont need to call server
    if (this.provCityService.allProvinceCity.length > 0) {
      this.allProvCity = this.provCityService.allProvinceCity;
    } else {
      // if all province are not already exist in provCityService, get all from server and store to service
      this.provCityService.getAllProvinceCity()
        .subscribe((resData) => {
          if (resData.data) {
            this.provCityService.allProvinceCity = resData.data.sort((provinceA, provinceB) => {
              if (provinceA.provinceName > provinceB.provinceName) {
                return 1;
              } else { return -1; }
            });
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
    // emit event
    this.postService.provinceCityChanged.next();
  }

  onSelectProvince(selectedProvince: string) {
    // check if selected province is valid, if invalid => fake province => hacker
    const realProvince = this.provCityService.allProvinceCity.find((eachEle) => {
      return eachEle.provinceName === selectedProvince;
    });
    if (realProvince !== null && realProvince !== undefined) {
      // check list province if selected province is a new province
      const duplicateProvince = this.post.location.provinceCity.find((eachEle) => {
        return eachEle === selectedProvince;
      });
      // if is a new province => add the new
      if (duplicateProvince === null || duplicateProvince === undefined) {
        this.post.location.provinceCity.push(selectedProvince);
      }
    }
    // emit event
    this.postService.provinceCityChanged.next();
  }

  onUpdatePlace(event: Event) {
    // validate here
    this.post.location.locationName = (event.target as HTMLInputElement).value;
    // emit event
    this.postService.placeChanged.next();
  }

  onUpdateAddress(event: Event) {
    // validate here
    this.post.location.address = (event.target as HTMLInputElement).value;
    // emit event
    this.postService.addressChanged.next();
  }
}
