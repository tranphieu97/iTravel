import { Component, OnInit, Input } from '@angular/core';
import { PostCategory } from 'src/app/model/postCategory.model';
import { PostCategoryService } from 'src/app/core/services/post-category.service';
import { element } from '@angular/core/src/render3/instructions';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  // @Input() localCategories: PostCategory[] = [];
  @Input() post: Post;
  allCategories: PostCategory[] = [];

  constructor(private postCategoryService: PostCategoryService) { }

  ngOnInit() {
    this.postCategoryService.newCategoriesUpdated.asObservable()
      .subscribe(() => {
        // update allCategories same as data on service
        this.allCategories = this.postCategoryService.allCategories;
      });
    this.postCategoryService.getAllCategories();
  }

  onSelectCategory(event: Event) {
    // get selectedCategory
    const selectedCategory = (event.target as HTMLSelectElement).value;
    // check if post has selectedCategory or not
    const sameCategory = this.post.categories.find((eachEle) => {
      return eachEle.name === selectedCategory;
    });
    if (sameCategory === undefined || sameCategory === null) {
      // if not yet, create newCategory from allCategories
      const newCategory = this.allCategories.find((eachEleInALL) => {
        return eachEleInALL.name.toLowerCase() === selectedCategory.toLocaleLowerCase();
      });
      // push that newCategory to post.categories
      this.post.categories.push(newCategory);
    }
  }

  onRemoveCategory(removedCategory: PostCategory, selectEle: HTMLSelectElement) {
    // filt out the removedCategory
    this.post.categories = this.post.categories.filter((eachEle) => {
      return eachEle.name !== removedCategory.name;
    });
    // reset the value of select element because the select subscibe onChange
    // if user choose and remove and choose the same category
    // there no change happen, so we need reset to make change
    selectEle.value = '';
  }
}
