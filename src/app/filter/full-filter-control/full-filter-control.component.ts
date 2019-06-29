import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { MasterPageService } from '../../core/services/master-page.service';
import { SearchService } from 'src/app/core/services/search.service';
import { ServerService } from 'src/app/core/services/server.service';
import { CardViewPost } from 'src/app/model/cardViewPost.model';
import { CardViewTour } from 'src/app/model/card-view-tour.model';
import { SearchHistory } from 'src/app/model/searchHistory.model';
import { UserService } from 'src/app/core/services/user.service';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-full-filter-control',
  templateUrl: './full-filter-control.component.html',
  styleUrls: ['./full-filter-control.component.scss']
})
export class FullFilterControlComponent implements OnInit {

  public keyword: string;
  public arrTours: Array<CardViewTour> = [];
  public arrPosts: Array<CardViewPost> = [];
  public isLoading: Boolean = false;

  compLanguage;
  constructor(public language: LanguageService, private searchService: SearchService, private server: ServerService,
    private userService: UserService, private tourService: TourService) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.pageFilter;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.pageFilter);

    this.keyword = this.searchService.getKeyword();
    this.search();
    this.searchService.hasChangeKeyword.subscribe(newKeyword => {
      this.keyword = newKeyword;
      this.search();
    });
  }

  search() {
    if (this.keyword.trim().length > 0) {
      this.isLoading = true;
      this.server.searchByKeyword(this.keyword).subscribe(res => {
        this.arrPosts = res.arrPost;
        this.server.getTourInterest().subscribe(interestRes => {
          if (interestRes.data) {
            // apply interest
            this.arrTours = this.tourService.applyInterest(res.arrTour, interestRes.data);
          }
        });
        this.isLoading = false;
      });

      const searchHistory: SearchHistory = new SearchHistory(this.keyword.trim().toLowerCase(), this.userService.getUserId());
      this.server.postSearchHistory(searchHistory).subscribe();
    }
  }
}
