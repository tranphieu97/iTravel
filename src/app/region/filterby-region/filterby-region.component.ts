import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { ServerService } from '../../core/services/server.service';
import { CardViewPost } from '../../model/cardViewPost.model';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-filterby-region',
  templateUrl: './filterby-region.component.html',
  styleUrls: ['./filterby-region.component.scss']
})
export class FilterbyRegionComponent implements OnInit, OnDestroy {

  pieChart;

  RegionPartParamID: any = {
    TheNorth: 'north',
    TheCentral: 'central',
    TheSouth: 'south'
  };

  regionID: string;
  regionTitle: string;
  listRegionPost: CardViewPost[];

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private language: LanguageService,
    private server: ServerService, private amchartServices: AmChartsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      // 'part' is name of id attribute in region.routing.ts for this component
      this.regionID = params['part'];
      if (this.regionID !== this.RegionPartParamID.TheNorth
        && this.regionID !== this.RegionPartParamID.TheCentral
        && this.regionID !== this.RegionPartParamID.TheSouth) {
        this.route.navigate(['/notfound']);
      } else {
        // Reset region information
        this.listRegionPost = [];
        this.setRegionTitle();
        if (this.pieChart) {
          this.amchartServices.destroyChart(this.pieChart);
        }

        // Set language change listener
        this.language.hasChangeLanguage.subscribe(() => {
          this.setRegionTitle();
        });

        // Get post from server
        this.server.getPostByRegion(this.regionID).subscribe((listCardViewPost) => {
          this.listRegionPost = listCardViewPost;
        });

        // Get data for chart
        this.server.getPostRatioByRegion(this.regionID).subscribe((res) => {
          const chartData = [
            {
              'region': this.regionTitle,
              'count': res.amountRegionPost
            }, {
              'region': 'Việt Nam',
              'count': res.amountAllPost
            }
          ];

          this.createPieChart(this.pieChart, 'post-ratio', chartData);
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.amchartServices.destroyChart(this.pieChart);
    }
  }

  /**
   * Set region title by regionId
   * @name setRegionTitle
   * @author phieu-th
   */
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

  /**
   * Create achart by count amount region post and all post
   * @name createPieChart
   * @author phieu-th
   * @param chart
   * @param divID
   * @param chartData
   */
  createPieChart(chart: AmChart, divID: string, chartData: any) {
    chart = this.amchartServices.makeChart(divID, {
      'type': 'pie',
      'theme': 'light',
      'dataProvider': chartData,
      'titleField': 'region',
      'valueField': 'count',

      'labelRadius': -40,
      'radius': '42%',
      // 'innerRadius': '0%',
      'labelText': '[[title]]',
      // 'export': {
      //   'enabled': true
      // }
    });
  }
}
