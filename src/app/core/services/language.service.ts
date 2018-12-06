import { Injectable } from '@angular/core';
import { LocaleLanguage } from 'src/app/model/locale-language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage: LocaleLanguage;

  private enLanguage: LocaleLanguage = new LocaleLanguage();
  private vnLanguage: LocaleLanguage = new LocaleLanguage();

  constructor() {
    this.createEnglishDictionary();
    this.createVietnameseDictionary();
    this.currentLanguage = this.enLanguage;
  }

  createVietnameseDictionary() {
    // For Header Component
    this.vnLanguage.headerVietnamese = 'Tiếng Việt';
    this.vnLanguage.headerEnglish = 'Tiếng Anh';
    this.vnLanguage.headerHi = 'Xin chào, ';
    this.vnLanguage.headerLogin = 'Đăng nhập';
    this.vnLanguage.headerRegister = 'Đăng ký';
    this.vnLanguage.headerQuestionToLogin = 'Bạn muốn đăng nhập chứ?';
  }

  createEnglishDictionary() {
    // For Header Component
    this.enLanguage.headerVietnamese = 'Vietnamese';
    this.enLanguage.headerEnglish = 'English';
    this.enLanguage.headerHi = 'Hi, ';
    this.enLanguage.headerLogin = 'Login';
    this.enLanguage.headerRegister = 'Register';
    this.enLanguage.headerQuestionToLogin = 'Do you want to login?';
  }

  setVietnamese() {
    this.currentLanguage = this.vnLanguage;
  }

  setEnglish() {
    this.currentLanguage = this.enLanguage;
  }
}
