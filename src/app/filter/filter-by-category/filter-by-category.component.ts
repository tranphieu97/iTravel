import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../../core/services/constant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../core/services/server.service';
import { CardViewPost } from '../../model/cardViewPost.model';
import { LanguageService } from 'src/app/core/services/language.service';


@Component({
  selector: 'app-filter-by-category',
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.scss']
})
export class FilterByCategoryComponent implements OnInit {

  listPostByCategory: CardViewPost[] = [];

  theMostAmountOfView: CardViewPost;

  compLanguage;

  constructor(private constant: ConstantService, private activatedRoute: ActivatedRoute, private router: Router,
    private server: ServerService, private language: LanguageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.listPostByCategory = [];
      this.theMostAmountOfView = undefined;

      if (!this.checkCorrectCategory(params.category) || !this.checkCorrectKind(params.kind)) {
        this.router.navigate(['notfound']);
      } else {
        this.server.getPostsByCategory(this.constant.MENU_CATEGORIES[params.category.toUpperCase()]).subscribe((res) => {
          this.listPostByCategory = res;
          this.sortListPostForKind(this.listPostByCategory, params.kind.toLowerCase());
          this.setTheMostAmountOfView(this.listPostByCategory);
        });
      }
    });
    this.compLanguage = this.language.currentLanguage.pageFilter;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.pageFilter);
  }

  /**
   * Check a category exist in list constant categories
   * @name checkCorrectCategory
   * @author phieu-th
   * @param categoryName
   */
  checkCorrectCategory(categoryName: string): boolean {
    for (const category in this.constant.MENU_CATEGORIES) {
      if (category.toLowerCase() === categoryName.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check a filter kind exist in list constant kind
   * @name checkCorrectKind
   * @author phieu-th
   * @param kindName
   */
  checkCorrectKind(kindName: string) {
    for (const kind in this.constant.MENU_KIND) {
      if (kind.toLowerCase() === kindName.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  /**
   * Sort an array CardViewPost by view counter
   * @name sortByViewAmount
   * @author phieu-th
   * @param listPosts
   */
  sortByViewAmount(listPosts: CardViewPost[]) {
    listPosts = listPosts.sort((post1, post2) => {
      if (post1.viewAmount < post2.viewAmount) {
        return 1;
      }

      if (post1.viewAmount > post2.viewAmount) {
        return -1;
      }

      return 0;
    });
  }

  /**
   * Sort an array CardViewPost by created time
   * @name sortByCreatedTime
   * @author phieu-th
   * @param listPosts
   */
  sortByCreatedTime(listPosts: CardViewPost[]) {
    listPosts = listPosts.sort((post1, post2) => {
      if (post1.createdTime.valueOf() < post2.createdTime.valueOf()) {
        return 1;
      }

      if (post1.createdTime.valueOf() > post2.createdTime.valueOf()) {
        return -1;
      }

      return 0;
    });
  }

  /**
   * Sort an array CardViewPost by kind of filter is chosen (hot or recent)
   * @name sortListPostForKind
   * @author phieu-th
   * @param listPosts
   * @param kindName
   */
  sortListPostForKind(listPosts: CardViewPost[], kindName: string) {
    switch (kindName) {
      case this.constant.MENU_KIND.HOT:
        this.sortByViewAmount(listPosts);
        break;
      case this.constant.MENU_KIND.RECENT:
        this.sortByCreatedTime(listPosts);
        break;
    }
  }

  /**
   * Set a post have the most amount of view
   * @name setTheMostAmountOfView
   * @author phieu-th
   * @param listPost
   */
  setTheMostAmountOfView(listPost: CardViewPost[]) {
    if (listPost) {
      this.theMostAmountOfView = listPost[0];

      listPost.forEach(post => {
        if (post.viewAmount > this.theMostAmountOfView.viewAmount) {
          this.theMostAmountOfView = post;
        }
      });
    }
  }
}
