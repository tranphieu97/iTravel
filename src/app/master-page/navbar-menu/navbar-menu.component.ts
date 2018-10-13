import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../model/Menu';
import { MasterPageService } from '../../core/services/master-page.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  @Input() inputMenu: Menu;

  isShowFullMenu: Boolean = false;

  constructor(private mtpService: MasterPageService) { }

  ngOnInit() {
  }

}
