import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  constructor(private language: LanguageService) { }

  ngOnInit() {
  }

}
