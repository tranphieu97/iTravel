import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

  isShowFullNavBar: Boolean = false;

  constructor() { }
}
