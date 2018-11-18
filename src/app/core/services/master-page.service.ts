import { Injectable } from '@angular/core';
import { Menu } from '../../model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

  isShowFullNavBar: Boolean = false;

  listMenu: Menu[];

  constructor() { }
}
