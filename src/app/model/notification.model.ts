import { NotificationItem } from './notification-item.model';

export class Notification {
  public _id: string;
  public userId: string;
  public notificationItems: Array<NotificationItem>;

  constructor(userId: string, notificationItems: Array<NotificationItem>) {
    this.userId = userId;
    this.notificationItems = notificationItems;
  }
}
