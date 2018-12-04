import { Component, OnInit } from '@angular/core';
import { MasterPageService } from '../../core/services/master-page.service';
import { SharedModule } from '../../shared/shared.module';
import { ServerService } from '../../core/services/server.service';
import { SearchHistory } from 'src/app/model/searchHistory.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';


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

  constructor(private mtpService: MasterPageService, private server: ServerService,
    private user: UserService, private router: Router) { }

  ngOnInit() {

  }

  searchByText() {
    if (this.searchBoxText.trim() !== '') {
      const searchHistory: SearchHistory =
        new SearchHistory(this.searchBoxText.toString().trim().toLowerCase(), '');
      this.server.postSearchHistory(searchHistory).subscribe();
      this.searchBoxText = '';
      this.isShowSearchBox = false;

      this.changeHeaderFlagByFlagName('isShowSearchBox');
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
