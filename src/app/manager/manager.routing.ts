import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostManagementComponent } from './post-management/post-management.component';

const routes: Routes = [
    { path: 'posts', component: PostManagementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class ManagerRoutingModule { }
