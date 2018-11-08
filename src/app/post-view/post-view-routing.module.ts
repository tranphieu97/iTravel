import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';

const postViewRoutes: Routes = [
    { path: '', component: PostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(postViewRoutes)],
    exports: [RouterModule]
})
// remember to import this module to the post-view.module to use the routing
export class PostViewRoutingModule {

}
