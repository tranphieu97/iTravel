import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { VietNamMapComponent } from './viet-nam-map/viet-nam-map.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageRoutingModule } from './home-page.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [IndexComponent, VietNamMapComponent]
})
export class HomePageModule { }
