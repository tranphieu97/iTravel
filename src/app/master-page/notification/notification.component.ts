import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() public inputNotification: Notification;

  constructor(public language: LanguageService) { }

  ngOnInit() {
  }

}
