import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() message: string;
  @Input() onAccept;
  commonLanguage;

  constructor(
    public activeModal: NgbActiveModal,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.commonLanguage = this.languageService.currentLanguage.common;
    this.languageService.hasChangeLanguage.subscribe(() => {
      this.commonLanguage = this.languageService.currentLanguage.common;
    });
  }
}
