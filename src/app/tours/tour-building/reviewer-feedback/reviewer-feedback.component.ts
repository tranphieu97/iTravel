import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstTourReviewer } from 'src/app/constants';
import { TourReviewer } from 'src/app/model/tour-reviewer.model';

@Component({
  selector: 'app-reviewer-feedback',
  templateUrl: './reviewer-feedback.component.html',
  styleUrls: ['./reviewer-feedback.component.scss']
})
export class ReviewerFeedbackComponent implements OnInit {

  REVIEW_STATUS: ConstTourReviewer = new ConstTourReviewer();
  @Input() currentReview: TourReviewer;

  constructor(public language: LanguageService) { }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compReviewerFeedback;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compReviewerFeedback;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.currentReview = new TourReviewer('test');
  }

}
