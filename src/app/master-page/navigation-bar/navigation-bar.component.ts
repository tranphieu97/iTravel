import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../core/services/server.service';
import { Menu } from '../../model/menu.model';
import { MasterPageService } from '../../core/services/master-page.service';
import { LanguageService } from '../../core/services/language.service';
import { MenuItem } from '../../model/menu-item.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  // HEADER_LOGO: String = 'data:image/png;base64,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';

  listMenu: Menu[] = [];

  // Data Menu
  menuHome: Menu = new Menu(this.language.currentLanguage.menuHome, 'assets/menu-icon/icon-home.png', 'home', 1);
  menuVNRegions: Menu = new Menu(this.language.currentLanguage.menuVNRegions, 'assets/menu-icon/icon-region.png', '', 2);
  menuTravel: Menu = new Menu(this.language.currentLanguage.menuTravel, 'assets/menu-icon/icon-travel.png', '', 3);
  menuCuisine: Menu = new Menu(this.language.currentLanguage.menuCuisine, 'assets/menu-icon/icon-cuisine.png', '', 4);
  menuPlans: Menu = new Menu(this.language.currentLanguage.menuPlans, 'assets/menu-icon/icon-plans.png', '', 5);
  menuTrend: Menu = new Menu(this.language.currentLanguage.menuTrend, 'assets/menu-icon/icon-trend.png', 'trend', 6);
  // menuPersonal: Menu = new Menu(this.language.currentLanguage.menuPersonal, 'assets/menu-icon/icon-user.png', '', 7);
  menuFilter: Menu = new Menu(this.language.currentLanguage.menuFilter, 'assets/menu-icon/icons8-slider-64.png', 'filter/all', 7);
  menuAbout: Menu = new Menu(this.language.currentLanguage.menuAbout, 'assets/menu-icon/icon-about.png', '', 8);

  // Menu Item Regions
  menuItemTheNorth: MenuItem = new MenuItem(this.language.currentLanguage.menuItemTheNorth, 'region/north');
  menuItemTheCentral: MenuItem = new MenuItem(this.language.currentLanguage.menuItemTheCentral, 'region/central');
  menuItemTheSouth: MenuItem = new MenuItem(this.language.currentLanguage.menuItemTheSouth, 'region/south');

  // Menu Item Travel
  menuItemHotTravel: MenuItem = new MenuItem(this.language.currentLanguage.menuItemHot, 'filter/travel/hot');
  menuItemRecentTravel: MenuItem = new MenuItem(this.language.currentLanguage.menuItemMostRecent, 'filter/travel/recent');

  // Menu Item Cuisine
  menuItemHotCuisine: MenuItem = new MenuItem(this.language.currentLanguage.menuItemHot, 'filter/cuisine/hot');
  menuItemRecentCuisine: MenuItem = new MenuItem(this.language.currentLanguage.menuItemMostRecent, 'filter/cuisine/recent');

  // Menu Item Plans
  menuItemOneDay: MenuItem = new MenuItem(this.language.currentLanguage.menuItemOneDay, '');
  menuItemOneWeek: MenuItem = new MenuItem(this.language.currentLanguage.menuItemOneWeek, '');
  menuItemMoreThanAWeek: MenuItem = new MenuItem(this.language.currentLanguage.menuItemMoreThanAWeek, '');

  // Menu Item Personal Information
  // menuItemPersonalInfo: MenuItem = new MenuItem(this.language.currentLanguage.menuItemProfile, 'user/profile');
  // menuItemChangePassword: MenuItem = new MenuItem(this.language.currentLanguage.menuItemChangePassword, '');
  // menuItemContribution: MenuItem = new MenuItem(this.language.currentLanguage.menuItemContribution, '');

  // Menu Filter

  // Menu Item About Us
  menuItemPolicies: MenuItem = new MenuItem(this.language.currentLanguage.menuItemPolicies, 'additional/policies');
  menuItemFeedback: MenuItem = new MenuItem(this.language.currentLanguage.menuItemFeedback, 'additional/feedback');

  constructor(private server: ServerService, private masterPage: MasterPageService,
    private language: LanguageService, private user: UserService) { }

  ngOnInit() {
    this.setMenu();

    this.language.hasChangeLanguage.subscribe(() => {
      this.refreshLanguage();
    });
  }

  refreshLanguage() {
    this.menuHome.name = this.language.currentLanguage.menuHome;
    this.menuVNRegions.name = this.language.currentLanguage.menuVNRegions;
    this.menuTravel.name = this.language.currentLanguage.menuTravel;
    this.menuCuisine.name = this.language.currentLanguage.menuCuisine;
    this.menuPlans.name = this.language.currentLanguage.menuPlans;
    this.menuTrend.name = this.language.currentLanguage.menuTrend;
    this.menuFilter.name = this.language.currentLanguage.menuFilter;
    // this.menuPersonal.name = this.language.currentLanguage.menuPersonal;
    this.menuAbout.name = this.language.currentLanguage.menuAbout;
    this.menuItemTheNorth.name = this.language.currentLanguage.menuItemTheNorth;
    this.menuItemTheCentral.name = this.language.currentLanguage.menuItemTheCentral;
    this.menuItemTheSouth.name = this.language.currentLanguage.menuItemTheSouth;
    this.menuItemHotTravel.name = this.language.currentLanguage.menuItemHot;
    this.menuItemRecentTravel.name = this.language.currentLanguage.menuItemMostRecent;
    this.menuItemHotCuisine.name = this.language.currentLanguage.menuItemHot;
    this.menuItemRecentCuisine.name = this.language.currentLanguage.menuItemMostRecent;
    this.menuItemOneDay.name = this.language.currentLanguage.menuItemOneDay;
    this.menuItemOneWeek.name = this.language.currentLanguage.menuItemOneWeek;
    this.menuItemMoreThanAWeek.name = this.language.currentLanguage.menuItemMoreThanAWeek;
    // this.menuItemPersonalInfo.name = this.language.currentLanguage.menuItemProfile;
    // this.menuItemChangePassword.name = this.language.currentLanguage.menuItemChangePassword;
    // this.menuItemContribution.name = this.language.currentLanguage.menuItemContribution;
    this.menuItemPolicies.name = this.language.currentLanguage.menuItemPolicies;
    this.menuItemFeedback.name = this.language.currentLanguage.menuItemFeedback;
  }

  setMenu() {
    this.listMenu = [];
    this.setMenuItemToMenu();
    this.listMenu.push(
      this.menuHome,
      this.menuVNRegions,
      this.menuTravel,
      this.menuCuisine,
      // this.menuPlans,
      this.menuFilter,
      this.menuTrend,
      // this.menuPersonal,
      this.menuAbout
    );
  }

  setMenuItemToMenu() {
    this.menuVNRegions.listItem.push(this.menuItemTheNorth, this.menuItemTheCentral, this.menuItemTheSouth);
    this.menuTravel.listItem.push(this.menuItemHotTravel, this.menuItemRecentTravel);
    this.menuCuisine.listItem.push(this.menuItemHotCuisine, this.menuItemRecentCuisine);
    this.menuPlans.listItem.push(this.menuItemOneDay, this.menuItemOneWeek, this.menuItemMoreThanAWeek);
    // this.menuPersonal.listItem.push(this.menuItemPersonalInfo, this.menuItemChangePassword, this.menuItemContribution);
    this.menuAbout.listItem.push(this.menuItemPolicies, this.menuItemFeedback);
  }

}
