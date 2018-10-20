import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NotFoundPageComponent } from './master-page/not-found-page/not-found-page.component';
import { AppRoutingModule } from './app.routing';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './master-page/header/header.component';
import { NavigationBarComponent } from './master-page/navigation-bar/navigation-bar.component';
import { NavbarMenuComponent } from './master-page/navbar-menu/navbar-menu.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundPageComponent,
    LayoutComponent,
    HeaderComponent,
    NavigationBarComponent,
    NavbarMenuComponent,
    NavigationBarComponent,
    NavbarMenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
