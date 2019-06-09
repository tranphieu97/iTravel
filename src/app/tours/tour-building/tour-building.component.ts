import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Tour } from 'src/app/model/tour.model';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourStatus } from 'src/app/constants';
import { UserService } from 'src/app/core/services/user.service';
import { TourReviewer } from 'src/app/model/tour-reviewer.model';

@Component({
  selector: 'app-tour-building',
  templateUrl: './tour-building.component.html',
  styleUrls: ['./tour-building.component.scss']
})
export class TourBuildingComponent implements OnInit {

  public tourId: string;
  public tourModel: Tour;
  public tourReviewerModel: TourReviewer;
  public TOUR_STATUS: ConstTourStatus = new ConstTourStatus();
  public userId: string;

  constructor(private route: ActivatedRoute, private router: Router, private server: ServerService, public language: LanguageService,
    private userService: UserService) { }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tourId = params['id'];
      if (this.tourId.length !== 24) {
        this.router.navigate(['/not-found']);
      } else {
        this.compLanguage = this.language.currentLanguage.compTourBuilding;
        this.commonLanguage = this.language.currentLanguage.common;
        this.language.hasChangeLanguage.subscribe(() => {
          this.compLanguage = this.language.currentLanguage.compTourBuilding;
          this.commonLanguage = this.language.currentLanguage.common;
        });

        this.server.getTour(this.tourId).subscribe(res => {
          if (res.data) {
            this.tourModel = res.data;

            if (this.tourModel.createdBy !== this.userId) {
              this.tourReviewerModel = this.tourModel.reviewers.filter(reviewer => reviewer.reviewerId === this.userId)[0];
            }
          }
        });
      }
    });

    this.userId = this.userService.getUserId();
  }

}
