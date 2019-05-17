import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';

@Component({
  selector: 'app-tour-member',
  templateUrl: './tour-member.component.html',
  styleUrls: ['./tour-member.component.scss']
})
export class TourMemberComponent implements OnInit {
  @Input() tourData: Tour;

  constructor() {}

  ngOnInit() {}
}
