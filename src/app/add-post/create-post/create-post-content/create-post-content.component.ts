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
    // find the post-content need add image
    const needAddPContent = this.post.postContents.find((eachEle) => {
      return eachEle._id === addedImgPostContent._id;
    });
    // if found needAddPContent, go to add image
    if (needAddPContent !== null && needAddPContent !== undefined) {
      const file = (event.target as HTMLInputElement).files[0];
      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.post.cover = reader.result.toString();
      // };
      // reader.readAsDataURL(file);

      this.postService.uploadImage(file).subscribe((resData) => {
        if (resData.imageUrl !== '') {
          needAddPContent.image = resData.imageUrl;
        }
      });
    }
  }

  onDelImageClick(removedImgPostContent: PostContent) {
    // find the post-content need remove image
    const needRemovedPContent = this.post.postContents.find((eachEle) => {
      return eachEle._id === removedImgPostContent._id;
    });
    needRemovedPContent.image = '';
  }

  onRemovePostContent(removedPostContent: PostContent) {
    // find the post-content need remove
    // const needRemovedPContent = this.postContents.find((eachEle) => {
    //   return eachEle._id === removedPostContent._id;
    // });
    this.post.postContents = this.post.postContents.filter((eachEle) => {
      return eachEle._id !== removedPostContent._id;
    });
  }

  onAddPostContent() {
    this.post.postContents.push(new PostContent('', '', '', ''));
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
