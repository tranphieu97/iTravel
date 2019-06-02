import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { Tour } from 'src/app/model/tour.model';

@Component({
  selector: 'app-tour-view',
  templateUrl: './tour-view.component.html',
  styleUrls: ['./tour-view.component.scss']
})
export class TourViewComponent implements OnInit {

  @Input() tourId: string;
  
  private tourModel: Tour;

  constructor(private server: ServerService) { }

  ngOnInit() {
  }

  getTourData() {
    this.server.getTour(this.tourId).subscribe(res => {
      if (res.data) {
        this.tourModel = res.data;
      }
    });
  }
}
