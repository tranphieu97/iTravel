import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-tour-building',
  templateUrl: './tour-building.component.html',
  styleUrls: ['./tour-building.component.scss']
})
export class TourBuildingComponent implements OnInit {

  public tourId: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tourId = params['id'];
      if (this.tourId.length !== 24) {
        this.router.navigate(['/not-found']);
      }
    });
  }

}
