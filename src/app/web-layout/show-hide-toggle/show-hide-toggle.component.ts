import { Component, OnInit, Input, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-show-hide-toggle',
  templateUrl: './show-hide-toggle.component.html',
  styleUrls: ['./show-hide-toggle.component.scss']
})
export class ShowHideToggleComponent implements OnInit {

  @Input() showFlag: Boolean;

  @HostListener('click') onclick() {
    this.showFlag = !this.showFlag;
  }

  constructor() { }

  ngOnInit() {
  }

}
