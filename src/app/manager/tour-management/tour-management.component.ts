import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/core/services/server.service';
import { ConstantService } from 'src/app/core/services/constant.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.scss']
})
export class TourManagementComponent implements OnInit {

  constructor(public language: LanguageService, private calendar: NgbCalendar, private server: ServerService,
    private modalService: NgbModal, public constant: ConstantService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // test get tour
    // this.server.getTour('5cb4744b393d6515e4757a0a').subscribe(res => console.log(res))

    // this.server.getTours().subscribe(res => console.log(res))

    // this.server.createTour({
    //   tourName: 'new tour',
    //   locations: ['place 1', 'place 2'],
    //   registerCost: 100000,
    // }).subscribe(res => console.log(res))

    // this.server.updateTour({
    //   _id: '5cad37d09dd9538ef41b7555',
    //   tourName: 'new tour update ' + Date.now(),
    //   locations: ['place 1', 'place 2'],
    //   registerCost: 100000,
    // }).subscribe(res => console.log(res))
  }
}
