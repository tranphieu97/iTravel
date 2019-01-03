import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ServerService } from '../../core/services/server.service';
import { Policy } from '../../model/policy.model';
import { MasterPageService } from '../../core/services/master-page.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  constructor(public language: LanguageService, private server: ServerService, private masterPage: MasterPageService) { }

  currentLanguagePolicies: Policy[];

  ngOnInit() {

    if (!this.masterPage.currentLanguagePolicies) {
      this.server.getPolicies().subscribe((res) => {
        if (res) {
          this.masterPage.vnPolicies = res.data.vnPolicies;
          this.masterPage.enPolicies = res.data.enPolicies;
        }
        this.masterPage.currentLanguagePolicies = this.masterPage.enPolicies;
        this.currentLanguagePolicies = this.masterPage.currentLanguagePolicies;
      });
    } else {
      this.currentLanguagePolicies = this.masterPage.currentLanguagePolicies;
    }

    this.language.hasChangeLanguage.subscribe(() => {
      this.currentLanguagePolicies = this.masterPage.currentLanguagePolicies;
    });
  }

}
