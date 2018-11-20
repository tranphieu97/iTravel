import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { AmChartsService, AmChart, AmChartsModule } from '@amcharts/amcharts3-angular';
import { ServerService } from '../../core/services/server.service';
import { Province } from '../../model/province.model';


@Component({
  selector: 'app-viet-nam-map',
  templateUrl: './viet-nam-map.component.html',
  styleUrls: ['./viet-nam-map.component.scss']
})
export class VietNamMapComponent implements OnInit {

  private pathPosition_X: number;
  private pathPosition_Y: number;

  private isFocusLocation: Boolean = false;
  private isFocusPopup: Boolean = false;

  private mousePosition_X: number;
  private mousePosition_Y: number;

  private listProvinces: Province[];

  private popupInfo: any = {
    ProvinceName: '',
    PostCount: 0,
    Position_X: '-100px',
    Position_Y: '-100px'
  };

  @HostListener('document:mousemove', ['$event'])
  onmousemove(event) {
    this.mousePosition_X = event.clientX;
    this.mousePosition_Y = event.clientY;
  }

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.server.getListProvinces().subscribe(res => {
      this.listProvinces = res;
    });

    this.ResetPopup();

    this.mousePosition_X = 0;
    this.mousePosition_Y = 0;
  }


  GetPathInformation(event, provinceID): void {
    this.isFocusLocation = true;

    this.pathPosition_X = event.clientX;
    this.pathPosition_Y = event.clientY;

    this.popupInfo.Position_X = (this.pathPosition_X - 70) + 'px';
    this.popupInfo.Position_Y = (this.pathPosition_Y + 15) + 'px';

    this.popupInfo.ProvinceName = this.listProvinces.find(x => x.provinceID === provinceID).provinceName;

  }

  LeavePath(): void {
    this.isFocusLocation = false;
  }

  FocusPopup(): void {
    this.isFocusPopup = true;
  }

  LeavePopup(): void {
    this.isFocusPopup = false;
    this.ResetPopup();
  }

  IsShowPopup(): boolean {
    if (this.isFocusLocation
        || this.isFocusPopup
        || (this.pathPosition_X - 45 <= this.mousePosition_X
              && this.pathPosition_X + 45 >= this.mousePosition_X
              && this.pathPosition_Y + 55 >= this.mousePosition_Y
              && this.pathPosition_Y <= this.mousePosition_Y)) {
      return true;
    }

    return false;
  }

  ResetPopup() {

    this.popupInfo.PostCount = 0;
    this.popupInfo.ProvinceName = '';

    this.pathPosition_X = -100;
    this.pathPosition_Y = -100;

    this.popupInfo.Position_X = this.pathPosition_X + 'px';
    this.popupInfo.Position_Y = this.pathPosition_Y + 'px';

    this.isFocusPopup = false;
  }
}
