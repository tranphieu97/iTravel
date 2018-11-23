import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import { SharedModule } from '../../shared/shared.module';
import { ServerService } from '../../core/services/server.service';


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

  constructor(private amchartServices: AmChartsService, private server: ServerService) { }

  ngOnInit() {
    this.pieChartEndDate = new Date(Date.now());
    this.pieChartStartDate = new Date(this.pieChartEndDate.getFullYear(),
            this.pieChartEndDate.getMonth(), this.pieChartEndDate.getDay() - 7);
    this.server.getReportBySearchKeyWordData(this.pieChartStartDate, this.pieChartEndDate)
      .subscribe((result) => {
        console.log(result);
    });

    // this.pieChart = this.amchartServices.makeChart('pie-chart-search', {
    //   'type': 'pie',
    //   'theme': 'light',
    //   'dataProvider': [{
    //     'country': 'Lithuania',
    //     'litres': 501.9
    //   }, {
    //     'country': 'Czech Republic',
    //     'litres': 301.9
    //   }, {
    //     'country': 'Ireland',
    //     'litres': 201.1
    //   }, {
    //     'country': 'Germany',
    //     'litres': 165.8
    //   }, {
    //     'country': 'Australia',
    //     'litres': 139.9
    //   }, {
    //     'country': 'Austria',
    //     'litres': 128.3
    //   }, {
    //     'country': 'UK',
    //     'litres': 99
    //   }, {
    //     'country': 'Belgium',
    //     'litres': 60
    //   }, {
    //     'country': 'The Netherlands',
    //     'litres': 50
    //   }],
    //   'titleField': 'title',
    //   'valueField': 'value',

    //   'labelRadius': 5,
    //   'radius': '42%',
    //   'innerRadius': '60%',
    //   'labelText': '[[title]]',
    //   'export': {
    //     'enabled': true
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.amchartServices.destroyChart(this.pieChart);
    }
  }

  createPieChart(chart: AmChart, divID: string) {

  }

  destroyChart(chart: AmChart) {
    if (chart) {
      this.amchartServices.destroyChart(chart);
    }
  }

}
