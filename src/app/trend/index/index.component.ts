import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import { SharedModule } from '../../shared/shared.module';
import { ServerService } from '../../core/services/server.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  pieChart: AmChart;
  pieChartErrorMessage: String = '';
  pieChartStartDate: Date;
  pieChartEndDate: Date;
  pieChartHasError: Boolean = false;

  constructor(private amchartServices: AmChartsService, private server: ServerService) { }

  ngOnInit() {
    this.pieChartEndDate = new Date(Date.now());
    this.pieChartStartDate = new Date(this.pieChartEndDate.getFullYear(),
            this.pieChartEndDate.getMonth(), this.pieChartEndDate.getDay() - 7);
    this.server.getReportBySearchKeyWordData(this.pieChartStartDate, this.pieChartEndDate).subscribe((result) => {

      this.createPieChart(this.pieChart, 'pie-chart-search', []);
    });
  }

  ngOnDestroy(): void {
    if (this.pieChart) {
      this.amchartServices.destroyChart(this.pieChart);
    }
  }

  createPieChart(chart: AmChart, divID: string, data: any) {
    chart = this.amchartServices.makeChart(divID, {
      'type': 'pie',
      'theme': 'light',
      'dataProvider': data,
      'titleField': 'title',
      'valueField': 'value',
      'labelRadius': 5,
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
