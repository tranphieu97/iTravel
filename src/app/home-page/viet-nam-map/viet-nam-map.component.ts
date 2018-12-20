import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { AmChartsService, AmChart, AmChartsModule } from '@amcharts/amcharts3-angular';
import { ServerService } from '../../core/services/server.service';
import { Province } from '../../model/province.model';
import { MasterPageService } from '../../core/services/master-page.service';
import { ProvinceCity } from '../../model/province-city.model';
import { Subject } from 'rxjs';
import { ConstantService } from '../../core/services/constant.service';


@Component({
  selector: 'app-viet-nam-map',
  templateUrl: './viet-nam-map.component.html',
  styleUrls: ['./viet-nam-map.component.scss']
})
export class VietNamMapComponent implements OnInit {

  pathPosition_X: number;
  pathPosition_Y: number;

  isFocusLocation: Boolean = false;
  isFocusPopup: Boolean = false;

  mousePosition_X: number;
  mousePosition_Y: number;

  listProvinces: ProvinceCity[];

  private popupInfo: any = {
    provinceName: '',
    postCount: 0,
    position_X: '-100px',
    position_Y: '-100px'
  };

  @HostListener('document:mousemove', ['$event'])
  onmousemove(event) {
    this.mousePosition_X = event.clientX;
    this.mousePosition_Y = event.clientY;
  }

  constructor(private server: ServerService, private masterPage: MasterPageService, private constant: ConstantService) { }

  ngOnInit() {
    if (this.masterPage.listProvinces === undefined || this.masterPage.listProvinces.length === 0) {
      this.server.getListProvinces().subscribe((listProvinces) => {
        this.masterPage.listProvinces = listProvinces;
        this.listProvinces = listProvinces;
      });
    } else {
      this.listProvinces = this.masterPage.listProvinces;
    }

    this.resetPopup();

    this.mousePosition_X = 0;
    this.mousePosition_Y = 0;
  }


  /**
   * Set a province information when hover to it path
   * @name getPathInformation
   * @author phieu-th
   * @param event
   * @param provinceId
   */
  getPathInformation(event, provinceId): void {
    this.isFocusLocation = true;

    this.pathPosition_X = event.clientX;
    this.pathPosition_Y = event.clientY;

    this.popupInfo.position_X = (this.pathPosition_X - 70) + 'px';
    this.popupInfo.position_Y = (this.pathPosition_Y + 30) + 'px';

    this.popupInfo.provinceName = this.listProvinces.find(x => x.provinceId === provinceId).provinceName;

  }

  /**
   * Change flag to hide popup
   * @name leavePath
   * @author phieu-th
   */
  leavePath(): void {
    this.isFocusLocation = false;
  }

  /**
   * Change flag to block popup position
   * @name focusPopup
   * @author phieu-th
   */
  focusPopup(): void {
    this.isFocusPopup = true;
  }

  /**
   * Hide popup after leave
   * @name leavePopup
   * @author phieu-th
   */
  leavePopup(): void {
    this.isFocusPopup = false;
    this.resetPopup();
  }

  /**
   * Check popup can be showed
   * @name isShowPopup
   * @author phieu-th
   */
  isShowPopup(): boolean {
    if (this.isFocusLocation) {
      // || this.isFocusPopup
      // || (this.pathPosition_X - 45 <= this.mousePosition_X
      //   && this.pathPosition_X + 45 >= this.mousePosition_X
      //   && this.pathPosition_Y + 55 >= this.mousePosition_Y
      //   && this.pathPosition_Y <= this.mousePosition_Y)) {
      return true;
    }

    return false;
  }

  /**
   * Hide and reset popup position
   * @name resetPopup
   * @author phieu-th
   */
  resetPopup() {
    this.popupInfo.PostCount = 0;
    this.popupInfo.ProvinceName = '';

    this.pathPosition_X = -100;
    this.pathPosition_Y = -100;

    this.popupInfo.Position_X = this.pathPosition_X + 'px';
    this.popupInfo.Position_Y = this.pathPosition_Y + 'px';

    this.isFocusPopup = false;
  }

  /**
   * Set provinceName to MasterPage Services for Home Index change list post
   * @name setSelectProvince
   * @author phieu-th
   * @param provinceId
   */
  setSelectProvince(provinceId: string) {
    const provinceCity = this.listProvinces.find(x => x.provinceId === provinceId);
    if (provinceCity !== undefined) {
      this.masterPage.selectedProvince = provinceCity.provinceName;
    } else {
      this.masterPage.selectedProvince = this.constant.ALL_PROVINCE;
    }
    this.masterPage.hasChangeSelectedProvince.next();
  }
}
