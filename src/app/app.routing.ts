import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './master-page/not-found-page/not-found-page.component';
import { LayoutComponent } from './web-layout/layout/layout.component';
import { AuthLayoutComponent } from './web-layout/auth-layout/auth-layout.component';
import { AuthGuard } from './core/_guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: 'src/app/auth/auth.module#AuthModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create-post',
    component: LayoutComponent,
    loadChildren: 'src/app/add-post/add-post.module#AddPostModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: 'src/app/home-page/home-page.module#HomePageModule'
  },
  {
    // only use this path at the beginning, need to add id later
    path: 'view-post',
    component: LayoutComponent,
    loadChildren: 'src/app/post-view/post-view.module#PostViewModule'
  },
  {
    path: 'user',
    component: LayoutComponent,
    loadChildren: 'src/app/user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'additional',
    component: LayoutComponent,
    loadChildren: 'src/app/additional/additional.module#AdditionalModule'
  },
  {
    path: 'region',
    component: LayoutComponent,
    loadChildren: 'src/app/region/region.module#RegionModule'
  },
  {
    path: 'trend',
    component: LayoutComponent,
    loadChildren: 'src/app/trend/trend.module#TrendModule'
  },
  {
    path: 'manager',
    component: LayoutComponent,
    loadChildren: 'src/app/manager/manager.module#ManagerModule'
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [NotFoundPageComponent];
