import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JWTInterceptor } from '../core/_helpers/jwt.interceptor';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HorizontalCardViewPostComponent } from '../card-view-style/horizontal-card-view-post/horizontal-card-view-post.component';
import { CardViewPostComponent } from '../card-view-style/card-view-post/card-view-post.component';
import { LoadingComponent } from '../web-layout/loading/loading.component';
import { HeadingComponent } from '../web-layout/heading/heading.component';
import { ShowHideToggleComponent } from '../web-layout/show-hide-toggle/show-hide-toggle.component';
import { HorizontalCardViewTourComponent } from '../card-view-style/horizontal-card-view-tour/horizontal-card-view-tour.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AddLocationComponent } from '../location/add-location/add-location.component';
import { LocationNameComponent } from '../web-layout/location-name/location-name.component';
import { UserFullnameComponent } from '../web-layout/user-fullname/user-fullname.component';
import { UserAvatarComponent } from '../web-layout/user-avatar/user-avatar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    HorizontalCardViewPostComponent,
    CardViewPostComponent,
    LoadingComponent,
    HeadingComponent,
    ShowHideToggleComponent,
    HorizontalCardViewTourComponent,
    LoginComponent,
    RegisterComponent,
    AddLocationComponent,
    LocationNameComponent,
    UserFullnameComponent,
    UserAvatarComponent
  ],
  declarations: [
    HorizontalCardViewPostComponent,
    CardViewPostComponent,
    LoadingComponent,
    HeadingComponent,
    ShowHideToggleComponent,
    HorizontalCardViewTourComponent,
    LoginComponent,
    RegisterComponent,
    AddLocationComponent,
    LocationNameComponent,
    UserFullnameComponent,
    UserAvatarComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
  ]
})
export class SharedModule { }
