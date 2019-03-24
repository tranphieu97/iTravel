import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostManagementComponent } from './post-management/post-management.component';
import { PermissionManagementComponent } from './permission-management/permission-management.component';

const routes: Routes = [
    { path: 'posts', component: PostManagementComponent },
    { path: 'permissions', component: PermissionManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class ManagerRoutingModule { }
