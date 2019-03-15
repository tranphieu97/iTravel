import { Component, OnInit } from '@angular/core';
import { CardViewPost } from '../../model/cardViewPost.model';
import { ServerService } from '../../core/services/server.service';
import { MasterPageService } from '../../core/services/master-page.service';
import { LanguageService } from '../../core/services/language.service';
import { ConstantService } from '../../core/services/constant.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  listShowCardViewPosts: CardViewPost[];
  listAllCardViewPost: CardViewPost[];

  isLoading: Boolean = true;

  constructor(private server: ServerService, public masterPage: MasterPageService, public language: LanguageService,
    private constant: ConstantService) { }

  ngOnInit() {
    this.refreshListPost();

    this.masterPage.hasChangeSelectedProvince.subscribe(() => {
      this.filterListShowPostByProvince(this.masterPage.selectedProvince);
    });

    this.masterPage.hasListProvince.subscribe(() => {
      this.masterPage.setCountAmountOfProvincePost(this.listAllCardViewPost);
    });
  }

  /**
   * Filter list post will be show by a province name
   * @name filterListShowPostByProvince
   * @author phieu-th
   * @param provinceName
   */
  filterListShowPostByProvince(provinceName: string) {
    this.isLoading = true;
    if (provinceName !== undefined && provinceName !== this.constant.ALL_PROVINCE) {
      this.listShowCardViewPosts = this.listAllCardViewPost.filter(post => post.location.provinceCity.indexOf(provinceName) !== -1);
    } else {
      this.listShowCardViewPosts = this.listAllCardViewPost;
    }
    this.isLoading = false;
  }

  /**
   * Re get list Card view post data
   * @name refreshListPost
   * @author phieu-th
   */
  refreshListPost() {
    this.isLoading = true;
    this.server.getCardViewPost().subscribe((result) => {
      this.listAllCardViewPost = result;
      this.listShowCardViewPosts = result;
      this.masterPage.selectedProvince = this.constant.ALL_PROVINCE;

      this.masterPage.setCountAmountOfProvincePost(this.listAllCardViewPost);
      this.isLoading = false;
    });
  }

}
