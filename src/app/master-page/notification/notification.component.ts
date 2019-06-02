import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationItem } from 'src/app/model/notification-item.model';
import { Notification } from 'src/app/model/notification.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  // @Input() public inputNotification: Notification;
  // public listNotification: Array<Notification> = [];
  public notificationItems: Array<NotificationItem> = [];
  public recentNotificationItems: Array<Notification> = [];
  sendTime: string;
  sendDate: string;
  compLanguage;
  constructor(public language: LanguageService, private serverService: ServerService, public userService: UserService) { }

  ngOnInit() {
    this.userService.isLoginChange.asObservable().subscribe(() => {
      if (this.userService.isLogin) {
        this.serverService.getUserNotification(this.userService.currentUser._id).subscribe(receiveData => {
          if (receiveData.data) {
            this.notificationItems = receiveData.data.notificationItems;
            this.recentNotificationItems = receiveData.data.notificationItems.slice(0, 10);
          } else {
            // if current user not has notification, create an empty one
            const newNoti = new Notification(this.userService.currentUser._id, []);
            this.serverService.postNewNotification(newNoti).subscribe();
          }
        });
      }
    });
    this.compLanguage = this.language.currentLanguage.compNotification;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.compNotification);
  }

  handleShowContent(divContent: HTMLDivElement, divShortContent: HTMLDivElement) {
    divContent.classList.add('show');
    divShortContent.classList.remove('show');
  }

  handleHideContent(divContent: HTMLDivElement, divShortContent: HTMLDivElement) {
    divContent.classList.remove('show');
    divShortContent.classList.add('show');
  }

  handleSeeNotification(noti: NotificationItem) {
    const foundNoti = this.notificationItems.find(eachNoti => eachNoti._id === noti._id);
    foundNoti.seen = true;
    // foundNoti.seen = !foundNoti.seen;
    this.serverService.updateNotification(this.notificationItems).subscribe((resData) => {
    });
  }

  getTime(notifyItem: NotificationItem) {
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const dateOptions = { month: 'numeric', day: 'numeric' };
    const tempDate = new Date(notifyItem.time);
    // return [time, date]
    return [
      tempDate.toLocaleString('vi-VI', timeOptions),
      tempDate.toLocaleString('vi-VI', dateOptions)
    ];
  }
}
