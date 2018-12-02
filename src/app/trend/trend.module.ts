import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { TrendRoutingModule } from './trend.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrendRoutingModule
  ],
  declarations: [IndexComponent]
})
export class TrendModule { }
