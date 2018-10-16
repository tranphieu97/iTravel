import { Component, OnInit } from '@angular/core';
import { MasterPageService } from '../../core/services/master-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private mtpService: MasterPageService) { }

  ngOnInit() {
  }

}
