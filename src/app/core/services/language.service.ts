import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Language } from 'src/app/locale-language/language.model';
import { LangVietnamese, LangEnglish } from 'src/app/locale-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  hasChangeLanguage: Subject<any> = new Subject<any>();

  currentLanguage: Language;

  private enLanguage: Language = new Language();
  private vnLanguage: Language = new Language();

  constructor() {
    this.createEnglishDictionary();
    this.createVietnameseDictionary();
    this.currentLanguage = this.enLanguage;
    this.hasChangeLanguage.next('en');
  }

  /**
   * Set Vietnamese for language variabales
   * @name createVietnameseDictionary
   * @author phieu-th
   */
  createVietnameseDictionary() {
    this.vnLanguage = LangVietnamese;
  }

  /**
   * Set English for language variables
   * @name createEnglishDictionary
   * @author phieu-th
   */
  createEnglishDictionary() {
    this.enLanguage = LangEnglish;
  }

  /**
   * Set language is using is Vietnamese
   * @name setVietnamese
   * @author phieu-th
   */
  setVietnamese() {
    this.currentLanguage = this.vnLanguage;
    this.hasChangeLanguage.next('vn');
  }

  /**
   * Set language is using is English
   * @name setEnglish
   * @author phieu-th
   */
  setEnglish() {
    this.currentLanguage = this.enLanguage;
    this.hasChangeLanguage.next('en');
  }
}
