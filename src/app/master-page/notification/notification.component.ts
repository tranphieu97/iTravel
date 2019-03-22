import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { ServerService } from 'src/app/core/services/server.service';
import { UserService } from 'src/app/core/services/user.service';
import { Notification } from 'src/app/model/notification.model';
import { NotificationItem } from 'src/app/model/notification-item.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  // @Input() public inputNotification: Notification;
  public listNotifications: Array<Notification> = [];
  sendTime: string;
  sendDate: string;
  constructor(public language: LanguageService, private serverService: ServerService, public userService: UserService) { }

  ngOnInit() {
    if (this.userService.currentUser._id) {
      this.serverService.getUserNotification(this.userService.currentUser._id).subscribe(receiveData => {
        this.listNotifications = receiveData.data.notificationItems.slice(0, 10);
      });
    }
  }

  handleShowContent(divContent: HTMLDivElement, divShortContent: HTMLDivElement) {
    divContent.classList.add('show');
    divShortContent.classList.remove('show');
  }

  handleHideContent(divContent: HTMLDivElement, divShortContent: HTMLDivElement) {
    divContent.classList.remove('show');
    divShortContent.classList.add('show');
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
