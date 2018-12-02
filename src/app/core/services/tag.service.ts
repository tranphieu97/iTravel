import { Injectable } from '@angular/core';
import { Tag } from 'src/app/model/tag.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tags: Tag[] = [];
  // create an Observable will emit when has new change
  newTagsUpdated = new Subject();

  constructor(private http: HttpClient, private server: ServerService) { }

  getAllTags() {
    this.server.getListTags().subscribe((resData => {
      if (resData.data) {
        this.tags = resData.data;
        this.newTagsUpdated.next();
      }
      // else err handling
    }));
  }

  updateTags() {

  }
}
