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
    this.vnLanguage.headerPersonalInfo = 'Thông tin cá nhân';
    this.vnLanguage.headerLogOut = 'Đăng xuất';

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
    this.vnLanguage.loginEnterUsername = 'Nhập Tên đăng nhập';
    this.vnLanguage.loginEnterPassword = 'Nhập Mật khẩu';

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
    this.vnLanguage.registerEnterFirstname = 'Nhập tên';
    this.vnLanguage.registerEnterLastname = 'Nhập họ';
    this.vnLanguage.registerEnterUsername = 'Nhập Tên đăng nhập';
    this.vnLanguage.registerEnterPassword = 'Nhập mật khẩu';
    this.vnLanguage.registerEnterConfirmPassword = 'Nhập lại mật khẩu';

    // For Feedback Component
    this.vnLanguage.feedbackTitle = 'Phản hồi';
    this.vnLanguage.feedbackName = 'Tên Phản hồi';
    this.vnLanguage.feedbackKindOf = 'Loại phản hồi';
    this.vnLanguage.feedbackUsername = 'Tên người gửi';
    this.vnLanguage.feedbackAdditionalContact = 'Thông tin liên hệ bổ sung';
    this.vnLanguage.feedbackContent = 'Nội dung Phản hồi';
    this.vnLanguage.feedbackAboutSystem = 'Về Hệ thống';
    this.vnLanguage.feedbackAboutContent = 'Về Nội dung';
    this.vnLanguage.feedbackAboutUser = 'Về Người dùng';
    this.vnLanguage.feedbackAboutPolicies = 'Về Chính sách sử dụng';
    this.vnLanguage.feedbackAboutOthers = 'Về các nội dung khác';
    this.vnLanguage.feedbackEnterName = 'Nhập Tên phản hồi';
    this.vnLanguage.feedbackEnterUsername = 'Nhập Tên người phản hồi';
    this.vnLanguage.feedbackEnterAdditionalContact = 'Nhập thông tin liên hệ bổ sung';
    this.vnLanguage.feedbackEnterContent = 'Nhập nội dung phản hồi';
    this.vnLanguage.feedbackSubmit = 'Gửi phản hồi';
    this.vnLanguage.feedbackCancel = 'Hủy';
    this.vnLanguage.feedbackErrorNameRequired = 'Tên Phản hồi là bắt buộc';
    this.vnLanguage.feedbackErrorKindOfRequired = 'Chọn loại Phản hồi là bắt buộc';
    this.vnLanguage.feedbackErrorContentRequired = 'Điền nội dung phản hồi là bắt buộc';
    this.vnLanguage.feedbackSuccess = 'Gửi phản hồi thành công, cảm ơn bạn đã đóng góp';
    this.vnLanguage.feedbackFail = 'Phản hồi thất bại, vui lòng thử lại';
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
    this.enLanguage.headerPersonalInfo = 'Personal Information';
    this.enLanguage.headerLogOut = 'Sign Out';

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
    this.enLanguage.loginEnterUsername = 'Enter your Username';
    this.enLanguage.loginEnterPassword = 'Enter your Password';

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
    this.enLanguage.registerEnterFirstname = 'Enter your First name';
    this.enLanguage.registerEnterLastname = 'Enter your Last name';
    this.enLanguage.registerEnterUsername = 'Enter your Username';
    this.enLanguage.registerEnterPassword = 'Enter your Password';
    this.enLanguage.registerEnterConfirmPassword = 'Re-enter your Password';

    // For Feedback Component
    this.enLanguage.feedbackTitle = 'Feedback';
    this.enLanguage.feedbackName = 'Feedback Name ';
    this.enLanguage.feedbackKindOf = 'Kind of Feedback ';
    this.enLanguage.feedbackUsername = 'Username';
    this.enLanguage.feedbackAdditionalContact = 'Additional Contact';
    this.enLanguage.feedbackContent = 'Feedback Content ';
    this.enLanguage.feedbackAboutSystem = 'About System';
    this.enLanguage.feedbackAboutContent = 'About Content';
    this.enLanguage.feedbackAboutUser = 'About User';
    this.enLanguage.feedbackAboutPolicies = 'About Policies';
    this.enLanguage.feedbackAboutOthers = 'The Others';
    this.enLanguage.feedbackEnterName = 'Enter Feedback Name';
    this.enLanguage.feedbackEnterUsername = 'Enter Username';
    this.enLanguage.feedbackEnterAdditionalContact = 'Enter Additional Contact Information';
    this.enLanguage.feedbackEnterContent = 'Enter Feedback Content';
    this.enLanguage.feedbackSubmit = 'Submit';
    this.enLanguage.feedbackCancel = 'Go back';
    this.enLanguage.feedbackErrorNameRequired = 'Feedback name is required';
    this.enLanguage.feedbackErrorKindOfRequired = 'Choose kind of feedback is required';
    this.enLanguage.feedbackErrorContentRequired = 'Feedback content is required';
    this.enLanguage.feedbackSuccess = 'Feedback Success! Thanks for your feedback';
    this.enLanguage.feedbackFail = 'Feedback Fail! Please try again';
  }

  setVietnamese() {
    this.currentLanguage = this.vnLanguage;
  }

  setEnglish() {
    this.currentLanguage = this.enLanguage;
  }
}
