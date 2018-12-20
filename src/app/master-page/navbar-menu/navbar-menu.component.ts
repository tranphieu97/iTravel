import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../model/menu.model';
import { MasterPageService } from '../../core/services/master-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  @Input() inputMenu: Menu;

  isShowFullMenu: Boolean = false;

  isSingleMenu: Boolean = false;

  constructor(public mtpService: MasterPageService, private route: Router) { }

  ngOnInit() {
    if (this.inputMenu.listItem.length > 0) {
      this.isSingleMenu = false;
    } else {
      this.isSingleMenu = true;
    }
  }

  ClickMenuName() {
    if (this.inputMenu.listItem.length > 0) {
      this.isShowFullMenu = !this.isShowFullMenu;
    } else {
      if (this.inputMenu.link == null || this.inputMenu.link === '') {

      } else {
        this.route.navigate([this.inputMenu.link]);
      }
    }
  }

  RedirectByMenu(categoryLink: string) {
    if (categoryLink != null && categoryLink !== '') {
      this.route.navigate([categoryLink]);
    }
  }
}
