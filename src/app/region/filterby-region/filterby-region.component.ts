import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { ServerService } from '../../core/services/server.service';
import { CardViewPost } from '../../model/cardViewPost.model';

@Component({
  selector: 'app-filterby-region',
  templateUrl: './filterby-region.component.html',
  styleUrls: ['./filterby-region.component.scss']
})
export class FilterbyRegionComponent implements OnInit {

  RegionPartParamID: any = {
    TheNorth: 'north',
    TheCentral: 'central',
    TheSouth: 'south'
  };

  regionID: string;
  regionTitle: string;
  listRegionPost: CardViewPost[];

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private language: LanguageService,
    private server: ServerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      // 'part' is name of id attribute in region.routing.ts for this component
      this.regionID = params['part'];
      if (this.regionID !== this.RegionPartParamID.TheNorth
        && this.regionID !== this.RegionPartParamID.TheCentral
        && this.regionID !== this.RegionPartParamID.TheSouth) {
        this.route.navigate(['/notfound']);
      } else {
        this.listRegionPost = [];
        this.setRegionTitle();

        this.language.hasChangeLanguage.subscribe(() => {
          this.setRegionTitle();
        });

        this.server.getPostByRegion(this.regionID).subscribe((listCardViewPost) => {
          this.listRegionPost = listCardViewPost;
        });
      }
    });
  }

  setRegionTitle() {
    switch (this.regionID) {
      case this.RegionPartParamID.TheNorth:
        this.regionTitle = this.language.currentLanguage.regionTheNorth;
        break;
      case this.RegionPartParamID.TheCentral:
        this.regionTitle = this.language.currentLanguage.regionTheCentral;
        break;
      case this.RegionPartParamID.TheSouth:
        this.regionTitle = this.language.currentLanguage.regionTheSouth;
        break;
    }
  }
}
