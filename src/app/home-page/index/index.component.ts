import { Component, OnInit } from '@angular/core';
import { CardViewPost } from '../../model/cardViewPost.model';
import { ServerService } from '../../core/services/server.service';
import { MasterPageService } from '../../core/services/master-page.service';
import { LanguageService } from '../../core/services/language.service';
import { ConstantService } from '../../core/services/constant.service';
import { ConstTourStatus } from 'src/app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  listShowCardViewPosts: CardViewPost[];
  listAllCardViewPost: CardViewPost[];

  isLoadingPost: Boolean = true;
  isLoadingTour: Boolean = true;

  arrPendingTour: Array<any> = [];
  arrRegisteringTour: Array<any> = [];

  compLanguage;
  commonLanguage;
  TOUR_STATUS: ConstTourStatus = new ConstTourStatus();

  constructor(private server: ServerService, public masterPage: MasterPageService, public language: LanguageService,
    private constant: ConstantService, private router: Router) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.pageHome;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.pageHome;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.refreshListPost();
    this.getTours();

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
    this.isLoadingPost = true;
    if (provinceName !== undefined && provinceName !== this.constant.ALL_PROVINCE) {
      this.listShowCardViewPosts = this.listAllCardViewPost.filter(post => post.location.provinceCity.indexOf(provinceName) !== -1);
    } else {
      this.listShowCardViewPosts = this.listAllCardViewPost;
    }
    this.isLoadingPost = false;
  }

  /**
   * Re get list Card view post data
   * @name refreshListPost
   * @author phieu-th
   */
  refreshListPost() {
    this.isLoadingPost = true;
    this.server.getCardViewPost().subscribe((result) => {
      this.listAllCardViewPost = result.sort((post1, post2) => {
        return (new Date(post2.createdTime).valueOf() - new Date(post1.createdTime).valueOf());
      });
      this.listShowCardViewPosts = result.sort((post1, post2) => {
        return (new Date(post2.createdTime).valueOf() - new Date(post1.createdTime).valueOf());
      });
      this.masterPage.selectedProvince = this.constant.ALL_PROVINCE;

      this.masterPage.setCountAmountOfProvincePost(this.listAllCardViewPost);
      this.isLoadingPost = false;
    });
  }

  getTours() {
    this.isLoadingTour = true;
    this.server.getToursCardInfo().subscribe(res => {
      if (res.statusCode === 200) {
        this.arrPendingTour = res.data.filter(tour => tour.status === this.TOUR_STATUS.PENDING);
        this.arrRegisteringTour = res.data.filter(tour => tour.status === this.TOUR_STATUS.REGISTERING);

        this.arrPendingTour.sort((tour1, tour2) => {
          return new Date(tour1.closeFeedbackTime).valueOf() - new Date(tour2.closeFeedbackTime).valueOf();
        });
      }
      this.isLoadingTour = false;
    });
  }

  redirectToBuilding(tourId: string) {
    if (tourId && tourId.length === 24) {
      this.router.navigate(['/tours/building', tourId]);
    }
  }
}
