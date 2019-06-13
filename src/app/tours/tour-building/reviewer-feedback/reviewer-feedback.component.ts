import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourReviewer } from 'src/app/constants';
import { TourReviewer } from 'src/app/model/tour-reviewer.model';
import { ServerService } from 'src/app/core/services/server.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reviewer-feedback',
  templateUrl: './reviewer-feedback.component.html',
  styleUrls: ['./reviewer-feedback.component.scss']
})
export class ReviewerFeedbackComponent implements OnInit {

  REVIEW_STATUS: ConstTourReviewer = new ConstTourReviewer();
  @Input() currentReview: TourReviewer;
  @Input() tourId: string;

  public isLoading = false;

  constructor(public language: LanguageService, private server: ServerService, private userService: UserService) { }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compReviewerFeedback;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compReviewerFeedback;
      this.commonLanguage = this.language.currentLanguage.common;
    });
  }

  submitReview() {
    if (this.currentReview.state === this.REVIEW_STATUS.PENDING
      || this.currentReview.state === this.REVIEW_STATUS.APPROVED
      // Deny and request change need some feedback
      || this.currentReview.feedback.trim() !== '') {
      const userId = this.userService.getUserId();
      if (userId === this.currentReview.reviewerId) {
        this.isLoading = true;
        console.log(this.currentReview);
        console.log(userId);
        this.server.submitReviewerFeedback(this.tourId, this.currentReview, userId).subscribe(res => {
          if (res.statusCode !== 201) {
            alert(res.message);
          }
          this.isLoading = false;
        });
      }
    }
  }
}
