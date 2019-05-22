import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { TourPreparation } from 'src/app/model/tour-preparation.model';

@Component({
  selector: 'app-add-preparation',
  templateUrl: './add-preparation.component.html',
  styleUrls: ['./add-preparation.component.scss']
})
export class AddPreparationComponent implements OnInit {

  @Input() preparationModel: TourPreparation;

  constructor(public language: LanguageService) { }

  ngOnInit() {
  }

  setupDefault() {

  }

}
