import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss']
})
export class AddTourComponent implements OnInit {

  constructor(public language: LanguageService) { }

  ngOnInit() {
  }

}
