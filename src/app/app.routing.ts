import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './master-page/not-found-page/not-found-page.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './home-page/index/index.component';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '',
      component: LayoutComponent
    },
    {
      path: 'create-post',
      component: LayoutComponent,
      loadChildren: 'src/app/add-post/add-post.module#AddPostModule'
    },
    {
      path: 'home',
      component: LayoutComponent,
      loadChildren: 'src/app/home-page/home-page.module#HomePageModule'
    },
    {
      path: 'user',
      component: LayoutComponent,
      loadChildren: 'src/app/user/user.module#UserModule'
    },
    {
      path: '**',
      component: NotFoundPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [NotFoundPageComponent];
