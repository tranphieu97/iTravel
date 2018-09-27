import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AppRoutingModule } from './app.routing';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LayoutComponent,
    HeaderComponent,
    NavigationBarComponent,
    NavbarMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
