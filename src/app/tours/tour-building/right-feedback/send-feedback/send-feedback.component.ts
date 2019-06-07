import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ServerService } from 'src/app/core/services/server.service';
import { TourFeedback } from 'src/app/model/tour-feedback.model';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.scss']
})
export class SendFeedbackComponent implements OnInit, AfterViewInit {
  @Input() tourId: string;
  @Input() refetchTourFeedbacks;
  authorAvatar = '';
  isLogin;
  compLanguage;

  constructor(
    private userService: UserService,
    private serverService: ServerService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.compTourBuilding;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourBuilding)
    );
    this.getAuthorAvatar();
    this.isLogin = this.userService.isLogin;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLogin = this.userService.isLogin;
    }, 1500);
  }

  onSendTourFeedback(feedbackElement: HTMLTextAreaElement) {
    const feedbackContent = feedbackElement.value;
    // if textarea empty but user click add comment => ignore
    if (feedbackContent.length > 0) {
      // validate comment maxlength
      if (feedbackContent.length <= 500) {
        const newFeedback = new TourFeedback(
          this.userService.currentUser._id,
          feedbackContent
        );
        this.serverService
          .sendTourFeedback(this.tourId, newFeedback)
          .subscribe(res => {
            if (res.message === 'Success') {
              this.refetchTourFeedbacks();
            } else {
              alert(res.message);
            }
          });
      } else {
        alert('Can not send feedback too long');
      }
    }
    //   // reset textarea
    feedbackElement.value = '';
  }

  getAuthorAvatar() {
    if (!this.userService.currentUser.avatar) {
      this.authorAvatar = 'assets/img/icons8-male-user-96.png';
    } else {
      this.authorAvatar = this.userService.currentUser.avatar;
    }
  }
}
