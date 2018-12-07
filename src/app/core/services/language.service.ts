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
    this.vnLanguage.headerSearch = 'Tìm kiếm';

    // For Login
    this.vnLanguage.loginTitle = 'ĐĂNG NHẬP';
    this.vnLanguage.loginUsername = 'Tên Đăng nhập';
    this.vnLanguage.loginPassword = 'Mật khẩu';
    this.vnLanguage.loginSignIn = 'Đăng nhập';
    this.vnLanguage.loginSignInWithGoogle = ' Đăng nhập bằng Tài khoản ';
    this.vnLanguage.loginNotRegister = 'Chưa có Tài khoản ';
    this.vnLanguage.loginCreatAnAccount = 'Tạo Tài khoản ngay';
    this.vnLanguage.loginErrorUsernameRequired = 'Tên đăng nhập là bắt buộc';
    this.vnLanguage.loginErrorUsernameLength = 'Tên đăng nhập dài từ 6 - 30 ký tự';
    this.vnLanguage.loginErrorUsernamePattern = 'Tên đăng nhập bao gồm chữ, số, dấu _, @ và - ';
    this.vnLanguage.loginErrorPasswordRequired = 'Mật khẩu là bắt buộc';
    this.vnLanguage.loginErrorPasswordLength = 'Mật khẩu dài từ 8 ký tự';

    // For Register Component
    this.vnLanguage.registerTitle = 'ĐĂNG KÝ';
    this.vnLanguage.registerFirstName = 'Tên';
    this.vnLanguage.registerLastName = 'Họ: ';
    this.vnLanguage.registerUsername = 'Tên đăng nhập';
    this.vnLanguage.registerPassword = 'Mật khẩu';
    this.vnLanguage.registerConfirmPassword = 'Nhập lại mật khẩu';
    this.vnLanguage.registerAcceptPolicies = 'Tôi đồng ý với chính sách sử dụng ứng dụng';
    this.vnLanguage.registerRegister = 'Đăng ký';
    this.vnLanguage.registerBackToHome = 'Quay về Trang chủ';
    this.vnLanguage.registerBackToLogin = 'Quay về Đăng nhập';
    this.vnLanguage.registerErrorFirstNameRequired = 'Tên là bắt buộc';
    this.vnLanguage.registerErrorUsernameRequired = 'Tên đăng nhập là bắt buộc';
    this.vnLanguage.registerErrorUsernameLength = 'Tên đăng nhập dài từ 6 - 30 ký tự';
    this.vnLanguage.registerErrorUsernamePattern = 'Tên đăng nhập bao gồm chữ, số, dấu _, @ và - ';
    this.vnLanguage.registerErrorPasswordRequired = 'Mật khẩu là bắt buộc';
    this.vnLanguage.registerErrorPasswordLength = 'Mật khẩu dài từ 8 ký tự';
    this.vnLanguage.registerErrorPasswordPattern = 'Mật khẩu gồm chữ in hoa, chữ thường và số';
  }

  createEnglishDictionary() {
    // For Header Component
    this.enLanguage.headerVietnamese = 'Vietnamese';
    this.enLanguage.headerEnglish = 'English';
    this.enLanguage.headerHi = 'Hi, ';
    this.enLanguage.headerLogin = 'Login';
    this.enLanguage.headerRegister = 'Register';
    this.enLanguage.headerQuestionToLogin = 'Do you want to login?';
    this.enLanguage.headerSearch = 'Search';

    // For Login Component
    this.enLanguage.loginTitle = 'SIGN IN';
    this.enLanguage.loginUsername = 'Username';
    this.enLanguage.loginPassword = 'Password';
    this.enLanguage.loginSignIn = 'Sign In';
    this.enLanguage.loginSignInWithGoogle = ' Sign in With ';
    this.enLanguage.loginNotRegister = 'Not Registered ';
    this.enLanguage.loginCreatAnAccount = 'Create An Account';
    this.enLanguage.loginErrorUsernameRequired = 'Username is required';
    this.enLanguage.loginErrorUsernameLength = 'An Username has 6 - 30 charaters';
    this.enLanguage.loginErrorUsernamePattern = 'An Username just includes charaters a-z, number, _, @ and -';
    this.enLanguage.loginErrorPasswordRequired = 'Password is required';
    this.enLanguage.loginErrorPasswordLength = 'A Password has least 8 charaters';

    // For Register Component
    this.enLanguage.registerTitle = 'REGISTER';
    this.enLanguage.registerFirstName = 'First Name';
    this.enLanguage.registerLastName = 'Last Name:';
    this.enLanguage.registerUsername = 'Choose a Username';
    this.enLanguage.registerPassword = 'Choose a Password';
    this.enLanguage.registerConfirmPassword = 'Confirm Password';
    this.enLanguage.registerAcceptPolicies = 'I accept this website\'s policies';
    this.enLanguage.registerRegister = 'Register';
    this.enLanguage.registerBackToHome = 'Back to Home';
    this.enLanguage.registerBackToLogin = 'Back to Login';
    this.enLanguage.registerErrorFirstNameRequired = 'First name is required';
    this.enLanguage.registerErrorUsernameRequired = 'Username is required';
    this.enLanguage.registerErrorUsernameLength = 'An Username has 6 - 30 charaters';
    this.enLanguage.registerErrorUsernamePattern = 'An Username just includes charaters a-z, number, _, @ and -';
    this.enLanguage.registerErrorPasswordRequired = 'Password is required';
    this.enLanguage.registerErrorPasswordLength = 'A Password has least 8 charaters';
    this.enLanguage.registerErrorPasswordPattern = 'A Password need includes upper case charaters, lower case charaters, numbers';
  }

  setVietnamese() {
    this.currentLanguage = this.vnLanguage;
  }

  setEnglish() {
    this.currentLanguage = this.enLanguage;
  }
}
