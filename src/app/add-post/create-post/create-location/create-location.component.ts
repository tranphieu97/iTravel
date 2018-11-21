import { Component, OnInit, Input } from '@angular/core';
import { Location } from 'src/app/model/location.model';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  @Input() location: Location = new Location([], '', '', '');

  constructor() { }

  ngOnInit() {
  }

}
