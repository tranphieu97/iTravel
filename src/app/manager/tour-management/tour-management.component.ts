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
  }

}
