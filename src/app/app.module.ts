import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NotFoundPageComponent } from './master-page/not-found-page/not-found-page.component';
import { AppRoutingModule } from './app.routing';
import { LayoutComponent } from './web-layout/layout/layout.component';
import { HeaderComponent } from './master-page/header/header.component';
import { NavigationBarComponent } from './master-page/navigation-bar/navigation-bar.component';
import { NavbarMenuComponent } from './master-page/navbar-menu/navbar-menu.component';
import { HomePageModule } from './home-page/home-page.module';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { CardViewPostComponent } from './card-view-post/card-view-post.component';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthLayoutComponent } from './web-layout/auth-layout/auth-layout.component';
import { HorizontalCardViewPostComponent } from './card-view-style/horizontal-card-view-post/horizontal-card-view-post.component';
import { NotificationComponent } from './master-page/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LayoutComponent,
    HeaderComponent,
    NavigationBarComponent,
    NavbarMenuComponent,
    NavigationBarComponent,
    NavbarMenuComponent,
    HeaderComponent,
    AuthLayoutComponent,
    HorizontalCardViewPostComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule,
    AmChartsModule,
    UserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
