import { Component, OnInit, Input } from '@angular/core';
import { PostCategory } from 'src/app/model/postCategory.model';
import { PostCategoryService } from 'src/app/core/services/post-category.service';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  // @Input() localCategories: PostCategory[] = [];
  @Input() post: Post;
  allCategories: PostCategory[] = [];

  constructor(private postCategoryService: PostCategoryService, private postService: PostService) { }

  ngOnInit() {
    this.postCategoryService.newCategoriesUpdated.asObservable()
      .subscribe(() => {
        // update allCategories same as data on service
        this.allCategories = this.postCategoryService.allCategories;
      });
    this.postCategoryService.getAllCategories();
  }

  // this event happen before user choose new category to reset select value
  onClickSelect(selectCate: HTMLSelectElement) {
    selectCate.value = '';
  }

  onSelectCategory(event: Event) {
    // get selectedCategory
    const selectedCategory = (event.target as HTMLSelectElement).value;
    // check if post has selectedCategory or not
    const duplicateCategory = this.post.categories.find((eachEle) => {
      return eachEle.name === selectedCategory;
    });
    if (duplicateCategory === undefined || duplicateCategory === null) {
      // if not yet, create newCategory from allCategories
      const newCategory = this.allCategories.find((eachEleInALL) => {
        return eachEleInALL.name.toLowerCase() === selectedCategory.toLowerCase();
      });
      if (newCategory !== null && newCategory !== undefined) {
        // push that newCategory to post.categories
        this.post.categories.push(newCategory);
      } else {
        // user choose a category that not exist => hacker
      }
    }
    // emit event
    this.postService.categoryChanged.next();
  }

  onRemoveCategory(removedCategory: PostCategory, selectEle: HTMLSelectElement) {
    // filt out the removedCategory
    this.post.categories = this.post.categories.filter((eachEle) => {
      return eachEle.name !== removedCategory.name;
    });
    // emit event
    this.postService.categoryChanged.next();
  }
}
