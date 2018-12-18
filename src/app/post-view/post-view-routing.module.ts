import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostScreenComponent } from './post-screen/post-screen.component';

const postViewRoutes: Routes = [
    { path: ':id', component: PostScreenComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forChild(postViewRoutes)],
    exports: [RouterModule]
})
// remember to import this module to the post-view.module to use the routing
export class PostViewRoutingModule {

}
