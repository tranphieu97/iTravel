import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPostManagementComponent } from './user-post-management/user-post-management.component';
import { UserTourComponent } from './user-tour/user-tour.component';

const routes: Routes = [
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
        path: 'posts',
        component: UserPostManagementComponent
    },
    {
        path: 'tours',
        component: UserTourComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class UserRoutingModule { }
