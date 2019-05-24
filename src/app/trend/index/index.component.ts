import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import { SharedModule } from '../../shared/shared.module';
import { ServerService } from '../../core/services/server.service';
import { LanguageService } from '../../core/services/language.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  pieChart;
  columnChart;
  pieChartErrorMessage: String = '';
  pieChartStartDate: Date;
  pieChartEndDate: Date;
  pieChartHasError: Boolean = false;

  theMostSearchKeyword: String = '';
  compLanguage;

  constructor(private amchartServices: AmChartsService, private server: ServerService, public language: LanguageService) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.pageTrend;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.pageTrend);
    this.pieChartEndDate = new Date(Date.now());
    this.pieChartStartDate = new Date(this.pieChartEndDate.getFullYear(),
      this.pieChartEndDate.getMonth(), this.pieChartEndDate.getDay() - 7);

    this.server.getReportBySearchKeyWordData(this.pieChartStartDate, this.pieChartEndDate)
      .subscribe((result) => {
        const searchData = result.data;

        this.getTop10SearchData(searchData);
        this.createPieChart(this.pieChart, 'piechart-search', searchData);
      });

    this.server.getReportByPostViewAmountData().subscribe((res) => {
      if (res.data) {
        const postViewAmountData = res.data;
        this.getTop10PostViewAmount(postViewAmountData);

        this.createColumnChart(this.columnChart, 'columnchart-postview', postViewAmountData);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.amchartServices.destroyChart(this.pieChart);
    }
  }

  /**
   * Get top 10 search keyword from list all search keyword
   * @name getTop10SearchData
   * @author phieu-th
   * @param arrData
   */
  getTop10SearchData(arrData: any) {
    let searchDataLength = arrData.length;

    // Calculator how many time search a key word
    for (let index = 0; index < searchDataLength; index++) {
      const record = arrData[index];

      for (let indexSecondLoop = index + 1; indexSecondLoop < searchDataLength; indexSecondLoop++) {
        const diffRecord = arrData[indexSecondLoop];

        if (record.keyword === diffRecord.keyword) {
          record.count++;
          arrData.splice(indexSecondLoop, 1);
          searchDataLength--;
          indexSecondLoop--;
        }
      }
      record.keyword = record.keyword.toUpperCase();
      arrData[index] = record;
    }

    // Sort by counter
    arrData.sort((n1, n2) => {
      return n2.count - n1.count;
    });

    // Get top 10
    if (arrData.length > 10) {
      const otherRecord = arrData[9];
      otherRecord.keyword = 'The Others';
      for (let index = 10; index < searchDataLength; index++) {
        const record = arrData[index];
        otherRecord.count += record.count;
      }
      arrData.splice(10, arrData.length - 10);
    }
    if (searchDataLength > 0) {
      this.theMostSearchKeyword = arrData[0].keyword;
    }
  }

  /**
   * Create a pie chart by top 10 search data
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
      'titleField': 'keyword',
      'valueField': 'count',

      'labelRadius': 2,
      'radius': '42%',
      'innerRadius': '60%',
      'labelText': '[[title]]',
      'export': {
        'enabled': true
      }
    });
  }

  createColumnChart(chart: AmChart, divID: string, chartData: any) {
    chart = this.amchartServices.makeChart(divID, {
      'type': 'serial',
      'theme': 'none',
      'marginRight': 70,
      'dataProvider': chartData,
      'valueAxes': [{
        'axisAlpha': 0,
        'position': 'left',
        'title': 'Top 10 Post View Amount',
        'labelsEnabled': false
      }],
      'startDuration': 1,
      'graphs': [{
        'balloonText': '<b>[[category]]: [[value]]</b>',
        'fillColorsField': 'color',
        'fillAlphas': 0.9,
        'lineAlpha': 0.2,
        'type': 'column',
        'valueField': 'viewAmount'
      }],
      'chartCursor': {
        'categoryBalloonEnabled': false,
        'cursorAlpha': 0,
        'zoomable': false
      },
      'categoryField': 'title',
      'categoryAxis': {
        'gridPosition': 'start',
        'labelRotation': 20,
        'labelsEnabled': false
      },
      'export': {
        'enabled': true
      }
    });
  }

  /**
   * Get top 10 post have the most amount of view in list post
   * @name getTop10PostViewAmount
   * @author phieu-th
   * @param arrData
   */
  getTop10PostViewAmount(arrData: any) {
    arrData.sort((post1, post2) => {
      return post2.viewAmount - post1.viewAmount;
    });

    let arrMaxlength = 10;

    if (arrData.length < 10) {
      arrMaxlength = arrData.length;
    }

    arrData = arrData.slice(0, arrMaxlength);
  }

  /**
   * Destroy a chart by chart Id
   * @name destroyChart
   * @author phieu-th
   * @param chart
   */
  destroyChart(chart: AmChart) {
    if (chart) {
      this.amchartServices.destroyChart(chart);
    }
  }
}


