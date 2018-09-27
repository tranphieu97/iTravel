import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  isShowFull: Boolean = true;

  constructor() { }
}
