import { Component, OnInit } from '@angular/core';
import { MasterPageService } from '../../core/services/master-page.service';
import { SharedModule } from '../../shared/shared.module';
import { ServerService } from '../../core/services/server.service';
import { SearchHistory } from 'src/app/model/searchHistory.model';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LanguageService } from '../../core/services/language.service';
import { SearchService } from 'src/app/core/services/search.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isShowSearchBox: Boolean = false;
  searchBoxText: String = '';

  headerFlags = {
    isShowSearchBox: false,
    isShowNotification: false,
    isShowLanguage: false,
    isShowSetting: false,
    isShowUserTool: false,
    isShowVisiterTool: false
  };

  compLanguage;

  constructor(public masterPage: MasterPageService, private server: ServerService, public language: LanguageService,
    public user: UserService, private router: Router, private searchService: SearchService) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compHeader;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.compHeader);
  }

  searchByText(event) {
    if (event.key === 'Enter') {
      console.log('test');
      if (this.searchBoxText.trim() !== '' && this.searchBoxText.trim().length > 2) {
        console.log('search');
        // Create log
        const searchHistory: SearchHistory =
          new SearchHistory(this.searchBoxText.trim().toLowerCase(), this.user.getUserId());
        this.server.postSearchHistory(searchHistory).subscribe();

        this.searchService.setKeyword(this.searchBoxText.toLocaleLowerCase());
        this.router.navigate(['filter/all']);
      }
    }
  }

  changeHeaderFlagByFlagName(flagName: string): void {
    if (this.headerFlags[flagName]) {
      this.headerFlags[flagName] = false;
    } else {
      const listProperties = Object.getOwnPropertyNames(this.headerFlags);

      listProperties.forEach(property => {
        this.headerFlags[property.toString()] = false;
      });
      if (listProperties.includes(flagName)) {
        this.headerFlags[flagName] = true;
      }
    }
  }
}
