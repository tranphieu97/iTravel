import { Component, OnInit } from '@angular/core';
import { MasterPageService } from 'src/app/core/services/master-page.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public mtpService: MasterPageService) { }

  ngOnInit() {
  }

}
