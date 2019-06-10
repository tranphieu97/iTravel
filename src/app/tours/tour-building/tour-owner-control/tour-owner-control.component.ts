import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { TourReviewer } from 'src/app/model/tour-reviewer.model';
import { ConstTourReviewer, ConstTourStatus } from 'src/app/constants';
import { MembersService } from 'src/app/core/services/members.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-owner-control',
  templateUrl: './tour-owner-control.component.html',
  styleUrls: ['./tour-owner-control.component.scss']
})
export class TourOwnerControlComponent implements OnInit {

  @Input() reviewers: TourReviewer[];
  @Input() tourId: string;

  public REVIEW_STATE: ConstTourReviewer = new ConstTourReviewer();
  private TOUR_STATUS: ConstTourStatus = new ConstTourStatus();
  public userId: string;
  public canComplete: Boolean = true;

  constructor(public language: LanguageService, public memberService: MembersService, private modalService: NgbModal,
    private userService: UserService, private server: ServerService, private router: Router) { }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourOwnerControl;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourOwnerControl;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.userId = this.userService.getUserId();

    this.reviewers.forEach(reviewer => {
      if (reviewer.state === this.REVIEW_STATE.DENIED || reviewer.state === this.REVIEW_STATE.REQUESTED_CHANGE) {
        this.canComplete = false;
      }
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm' });
  }

  deleteTour() {
    this.server.deleteOwnTour(this.tourId, this.userId).subscribe(res => {
      if (res.statusCode === 201) {
        this.router.navigate(['tours/manager']);
      }
    });
  }

  completeFeedbackTime() {
    if (this.canComplete) {
      this.server.updateTourStatus(this.tourId, this.TOUR_STATUS.REGISTERING).subscribe(res => {
        if (res.statusCode === 201) {
          this.router.navigate(['tours/manager']);
        }
      });
    }
  }
}
