import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss']
})
export class CreateTagComponent implements OnInit {
  @Input() tags: Array<string>;
  private allTags: Tag[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.newTagsUpdated.asObservable().subscribe(() => {
      // update tags same as data on service
      this.allTags = this.tagService.tags;
    });
  }

}
