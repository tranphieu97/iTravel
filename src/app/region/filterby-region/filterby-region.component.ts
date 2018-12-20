import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { ServerService } from '../../core/services/server.service';

@Component({
  selector: 'app-filterby-region',
  templateUrl: './filterby-region.component.html',
  styleUrls: ['./filterby-region.component.scss']
})
export class FilterbyRegionComponent implements OnInit {

  RegionPartParamID: any = {
    TheNorth: 'north',
    TheCenter: 'cental',
    TheSouth: 'south'
  };

  partID: string;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private language: LanguageService,
    private server: ServerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      // 'part' is name of id attribute in region.routing.ts for this component
      this.partID = params['part'];
      if (this.partID !== this.RegionPartParamID.TheNorth
        && this.partID !== this.RegionPartParamID.TheCenter
        && this.partID !== this.RegionPartParamID.TheSouth) {
        this.route.navigate(['/notfound']);
      }

      this.server.getPostByRegion(this.partID).subscribe((res) => {

      });
    });
  }

}
