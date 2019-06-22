import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private keyword: string;
  public hasChangeKeyword: Subject<string>;

  constructor() {
    this.hasChangeKeyword = new Subject<string>();
  }

  setKeyword(str: string) {
    this.keyword = str;
    this.hasChangeKeyword.next(this.keyword);
  }

  getKeyword() {
    return this.keyword ? this.keyword : '';
  }
}
