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
  pieChartErrorMessage: String = '';
  pieChartStartDate: Date;
  pieChartEndDate: Date;
  pieChartHasError: Boolean = false;

  theMostSearchKeyword: String = '';

  constructor(private amchartServices: AmChartsService, private server: ServerService, private language: LanguageService) { }

  ngOnInit() {
    this.pieChartEndDate = new Date(Date.now());
    this.pieChartStartDate = new Date(this.pieChartEndDate.getFullYear(),
      this.pieChartEndDate.getMonth(), this.pieChartEndDate.getDay() - 7);

    this.server.getReportBySearchKeyWordData(this.pieChartStartDate, this.pieChartEndDate)
      .subscribe((result) => {
        const searchData = result.data;

        this.getTop10SearchData(searchData);
        this.createPieChart(this.pieChart, 'piechart-search', searchData);
      });
  }

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

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.amchartServices.destroyChart(this.pieChart);
    }
  }

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

  destroyChart(chart: AmChart) {
    if (chart) {
      this.amchartServices.destroyChart(chart);
    }
  }
}


