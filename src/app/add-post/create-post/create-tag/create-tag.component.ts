import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss']
})
export class CreateTagComponent implements OnInit {
  @Input() tags: Tag[] = [];
  // all tag from server to recommend with user
  private allTags: Tag[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.newTagsUpdated.asObservable().subscribe(() => {
      // update tags same as data on service
      this.allTags = this.tagService.tags;
    });
  }

  onRemoveTag(removedTag: Tag) {
    this.tags = this.tags.filter((eachEle) => {
      return eachEle.tagContent !== removedTag.tagContent;
      //   // return eachEle._id !== removedCategory._id;
    });
  }

  onAddTag(inputTagElement: HTMLInputElement) {
    const newTag = new Tag(inputTagElement.value);
    const sameTag = this.tags.find((eachEle) => {
      return eachEle.tagContent === newTag.tagContent;
    });
    // if sameTag != null mean newTag already in tags, dont need to add again
    if (sameTag === null || sameTag === undefined) {
      this.tags.push(newTag);
    }
  }

  onPressEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onAddTag(event.target as HTMLInputElement);
    }
  }
}
