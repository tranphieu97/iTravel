import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { PoliciesComponent } from './policies/policies.component';

const routes: Routes = [
    {
        path: 'feedback',
        component: FeedbackComponent
    },
    {
        path: 'policies',
        component: PoliciesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class AdditionalRoutingModule { }
