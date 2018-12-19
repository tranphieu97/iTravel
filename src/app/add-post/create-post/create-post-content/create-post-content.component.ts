import { Component, OnInit, Input } from '@angular/core';
import { PostContent } from 'src/app/model/postContent.model';
import { PostViewService } from 'src/app/post-view/post-view.service';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-create-post-content',
  templateUrl: './create-post-content.component.html',
  styleUrls: ['./create-post-content.component.scss']
})

export class CreatePostContentComponent implements OnInit {
  // @Input() postContents: PostContent[] = [];
  @Input() post: Post;

  constructor(private postService: PostViewService) { }

  ngOnInit() {

  }

  onImagePicked(event: Event, addedImgPostContent: PostContent) {
    if (addedImgPostContent !== null && addedImgPostContent !== undefined) {
      const file = (event.target as HTMLInputElement).files[0];
      // config reader to read file and show preview
      const reader = new FileReader();
      reader.onload = () => {
        addedImgPostContent.image = reader.result.toString();
      };
      reader.readAsDataURL(file);
      // emit file and id of postContent to store temporarily on createPostComponent
      this.postService.hasNewImage.next({ imgFile: file, contentId: addedImgPostContent._id });
    }
  }

  onDelImageClick(removedImgPostContent: PostContent) {
    // delete image url
    removedImgPostContent.image = '';
    // emit event hasImgDeleted
    this.postService.hasImgDeleted.next(removedImgPostContent._id);
  }

  onRemovePostContent(removedPostContent: PostContent) {
    // filt out the removed postContent
    this.post.postContents = this.post.postContents.filter((eachEle) => {
      return eachEle._id !== removedPostContent._id;
    });
    // emit event hasImgDeleted
    this.postService.hasImgDeleted.next(removedPostContent._id);
  }

  onAddPostContent() {
    // create temp PostContent with fake Id
    const tempPostContent = new PostContent('', '', '', '');
    // fake Id
    tempPostContent._id = new Date().toUTCString();
    this.post.postContents.push(tempPostContent);
  }

  onUpdateTopicTitle(updatedPostContent: PostContent, event: Event) {
    const needUpdatedPostContent = this.post.postContents.find((eachEle) => {
      return eachEle._id === updatedPostContent._id;
    });
    // validate here
    needUpdatedPostContent.title = (event.target as HTMLInputElement).value;
  }

  onUpdateTopicContent(updatedPostContent: PostContent, event: Event) {
    const needUpdatedPostContent = this.post.postContents.find((eachEle) => {
      return eachEle._id === updatedPostContent._id;
    });
    // validate here
    needUpdatedPostContent.content = (event.target as HTMLTextAreaElement).value;
  }

  onUpdateImgDesc(updatedPostContent: PostContent, event: Event) {
    const needUpdatedPostContent = this.post.postContents.find((eachEle) => {
      return eachEle._id === updatedPostContent._id;
    });
    // validate here
    needUpdatedPostContent.imageDesc = (event.target as HTMLInputElement).value;
  }
}
