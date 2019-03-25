import { Component, OnInit, Input } from '@angular/core';
import { Tag } from 'src/app/model/tag.model';
import { TagService } from 'src/app/core/services/tag.service';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss']
})
export class CreateTagComponent implements OnInit {
  // @Input() tags: Tag[] = [];
  @Input() post: Post;
  @Input() compLanguage;
  // all tag from server to recommend with user
  private allTags: Tag[] = [];

  constructor(private tagService: TagService, private postService: PostService) { }

  ngOnInit() {
    this.tagService.newTagsUpdated.asObservable().subscribe(() => {
      // update tags same as data on service
      this.allTags = this.tagService.tags;
    });
  }

  onRemoveTag(removedTag: Tag) {
    this.post.tags = this.post.tags.filter((eachEle) => {
      return eachEle.tagContent !== removedTag.tagContent;
      //   // return eachEle._id !== removedCategory._id;
    });
    // console.log(this.tags);
  }

  onAddTag(inputTagElement: HTMLInputElement) {
    const newTag = new Tag(inputTagElement.value);
    // if tag empty => go out
    if (newTag.tagContent.length <= 0) {
      return;
    }
    // if tag too long => alert
    if (newTag.tagContent.length > 40) {
      // emit location of message: create-post.component.validateObject.validateTag.maxLength.message
      this.postService.newAlert.next(['validateTag', 'maxLength']);
      return;
    }
    const duplicateTag = this.post.tags.find((eachEle) => {
      return eachEle.tagContent === newTag.tagContent;
    });
    // if duplicateTag != null mean newTag already exist, don't need to add again
    if (duplicateTag === null || duplicateTag === undefined) {
      newTag._id = '';
      this.post.tags.push(newTag);
    }
    // console.log(this.tags);
  }

  onPressEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onAddTag(event.target as HTMLInputElement);
    }
  }
}
