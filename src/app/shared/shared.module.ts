import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AmChartsModule } from '@amcharts/amcharts3-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AmChartsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    AmChartsModule
  ],
  declarations: [],
  providers: []
})
export class SharedModule { }
