import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { AmChartsService, AmChart, AmChartsModule } from '@amcharts/amcharts3-angular';
import { $ } from 'protractor';


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

  private mousePosition_X: number;
  private mousePosition_Y: number;

  @HostListener('document:mousemove', ['$event'])
  onmousemove(event) {
    this.mousePosition_X = event.clientX;
    this.mousePosition_Y = event.clientY;
  }

  constructor() { }

  ngOnInit() {
    this.ResetPopup();

    this.mousePosition_X = 0;
    this.mousePosition_Y = 0;
  }


  GetPathPosition(event): void {
    this.isFocusLocation = true;

    this.pathPosition_X = event.clientX;
    this.pathPosition_Y = event.clientY;
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
        || (this.pathPosition_X - 30 <= this.mousePosition_X
              && this.pathPosition_X + 30 >= this.mousePosition_X
              && this.pathPosition_Y + 55 >= this.mousePosition_Y
              && this.pathPosition_Y <= this.mousePosition_Y)) {
      return true;
    }

    return false;
  }

  ResetPopup() {
    this.pathPosition_X = -100;
    this.pathPosition_Y = -100;

    this.isFocusPopup = false;
  }
}
