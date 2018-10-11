import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './master-page/not-found-page/not-found-page.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    { path: '', component: LayoutComponent },
    { path: '**', component: NotFoundPageComponent },
    { path: 'addpost', loadChildren: 'src/app/add-post/app-post.module#AddPostModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [NotFoundPageComponent];
