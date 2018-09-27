import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../model/Menu';
import { NavBarService } from '../core/services/nav-bar.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  @Input() inputMenu: Menu;

  isShowFull: Boolean = true;

  constructor(private navBarService: NavBarService) { }

  ngOnInit() {
  }

}
