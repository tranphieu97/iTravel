import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostManagementComponent } from './post-management/post-management.component';
import { PermissionManagementComponent } from './permission-management/permission-management.component';
import { TourManagementComponent } from './tour-management/tour-management.component';

const routes: Routes = [
    { path: 'posts', component: PostManagementComponent },
    { path: 'tours', component: TourManagementComponent },
    { path: 'permissions', component: PermissionManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class ManagerRoutingModule { }
