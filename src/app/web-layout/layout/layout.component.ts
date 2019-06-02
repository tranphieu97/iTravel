import { Component, OnInit } from '@angular/core';
import { MasterPageService } from 'src/app/core/services/master-page.service';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  compLanguage;

  constructor(public mtpService: MasterPageService, public user: UserService, public language: LanguageService) { }

  ngOnInit() {
    this.compLanguage = {...this.language.currentLanguage.compLayout};
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = {...this.language.currentLanguage.compLayout});
  }

}
