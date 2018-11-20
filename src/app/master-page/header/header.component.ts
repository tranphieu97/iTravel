import { Component, OnInit } from '@angular/core';
import { MasterPageService } from '../../core/services/master-page.service';
import { SharedModule } from '../../shared/shared.module';
import { ServerService } from '../../core/services/server.service';
import { SearchHistory } from 'src/app/model/searchHistory.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isShowSearchBox: Boolean = false;
  searchBoxText: String = '';

  constructor(private mtpService: MasterPageService, private server: ServerService) { }

  ngOnInit() {
  }

  searchByText() {
    if (this.searchBoxText.trim() !== '') {
      const searchHistory: SearchHistory =
        new SearchHistory(this.searchBoxText.toString().trim().toLowerCase(), '');
      this.server.postSearchHistory(searchHistory).subscribe();
      this.searchBoxText = '';
      this.isShowSearchBox = false;
    }
  }
}
