import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterbyRegionComponent } from './filterby-region/filterby-region.component';
import { SharedModule } from '../shared/shared.module';
import { RegionRoutingModule } from './region.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegionRoutingModule
  ],
  declarations: [FilterbyRegionComponent]
})
export class RegionModule { }
