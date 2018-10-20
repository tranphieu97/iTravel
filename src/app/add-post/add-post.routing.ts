import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostInformationComponent } from './add-post-information/add-post-information.component';

const routes: Routes = [
  { path: '', component: AddPostInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPostRoutingModule { }

export const routedComponents = [AddPostInformationComponent];
