import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { MasterPageService } from '../../core/services/master-page.service';

@Component({
  selector: 'app-full-filter-control',
  templateUrl: './full-filter-control.component.html',
  styleUrls: ['./full-filter-control.component.scss']
})
export class FullFilterControlComponent implements OnInit {

  constructor(public language: LanguageService, private masterPage: MasterPageService) { }

  ngOnInit() {
  }

}
