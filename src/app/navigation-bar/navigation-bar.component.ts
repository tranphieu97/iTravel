import { Component, OnInit } from '@angular/core';
import { Menu } from '../model/Menu';
import { Catagory } from '../model/Catagory';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  catagory1: Catagory = new Catagory('Mien Bac', '', '', []);
  catagory2: Catagory = new Catagory('Mien Trung', '', '', []);
  catagory3: Catagory = new Catagory('Mien Nam', '', '', []);

  // tslint:disable-next-line:max-line-length
  menu1: Menu = new Menu('Du lich', 'data:image/png;base64,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', '' , [this.catagory1, this.catagory2]);
  menu2: Menu = new Menu('An uong', '', '' , [this.catagory2, this.catagory3]);

  listMenu: Array<Menu> = [this.menu1, this.menu2];

  constructor() { }

  ngOnInit() {
  }

}
