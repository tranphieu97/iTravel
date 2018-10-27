import { Component, OnInit } from '@angular/core';
import { AmChartsService, AmChart, AmChartsModule } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-viet-nam-map',
  templateUrl: './viet-nam-map.component.html',
  styleUrls: ['./viet-nam-map.component.scss']
})
export class VietNamMapComponent implements OnInit {


  constructor(private AmCharts: AmChartsService) { }

  ngOnInit() {
  }

}
