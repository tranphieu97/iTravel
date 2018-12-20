import { Injectable } from '@angular/core';
import { LocaleLanguage } from 'src/app/model/locale-language.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  hasChangeLanguage: Subject<any> = new Subject<any>();

  currentLanguage: LocaleLanguage;

  private enLanguage: LocaleLanguage = new LocaleLanguage();
  private vnLanguage: LocaleLanguage = new LocaleLanguage();

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

    // For Menu in NavigationBar Component
    this.vnLanguage.menuHome = 'Trang chủ';
    this.vnLanguage.menuVNRegions = 'Vùng miền Việt Nam';
    this.vnLanguage.menuTravel = 'Du lịch';
    this.vnLanguage.menuCuisine = 'Ẩm thực';
    this.vnLanguage.menuPlans = 'Kế hoạch';
    this.vnLanguage.menuTrend = 'Xu hướng';
    this.vnLanguage.menuPersonal = 'Cá nhân';
    this.vnLanguage.menuAbout = 'Về chúng tôi';
    this.vnLanguage.menuItemTheNorth = 'Miền Bắc';
    this.vnLanguage.menuItemTheCentral = 'Miền Trung';
    this.vnLanguage.menuItemTheSourth = 'Miền Nam';
    this.vnLanguage.menuItemHot = 'Nổi bật';
    this.vnLanguage.menuItemMostRecent = 'Gần đây nhất';
    this.vnLanguage.menuItemOneDay = '1 Ngày';
    this.vnLanguage.menuItemOneWeek = '2 - 7 Ngày';
    this.vnLanguage.menuItemMoreThanAWeek = 'Từ 7 ngày';
    this.vnLanguage.menuItemProfile = 'Thông tin cá nhân';
    this.vnLanguage.menuItemChangePassword = 'Thay đổi mật khẩu';
    this.vnLanguage.menuItemContribution = 'Đóng góp';
    this.vnLanguage.menuItemPolicies = 'Chính sách sử dụng';
    this.vnLanguage.menuItemFeedback = 'Phản hồi';

    // For Notification
    this.vnLanguage.notificationFrom = 'Từ ';

    // For Post Management
    this.vnLanguage.postManagementTitle = 'Quản lý bài viết';
    this.vnLanguage.postManagementStartDate = 'Từ:';
    this.vnLanguage.postManagementEndDate = 'Đến:';
    this.vnLanguage.postManagementApproved = 'Đã phê duyệt';
    this.vnLanguage.postManagementPending = 'Đang chờ';
    this.vnLanguage.postManagementDenied = 'Từ chối';
    this.vnLanguage.postManagementAllPost = 'Tất cả';
    this.vnLanguage.postManagementErrorEmptyDate = 'Nhập ngày bắt đầu và ngày kết thúc để lọc';
    this.vnLanguage.postManagementErrorInvalidDate = 'Định dạng ngày tháng chưa đúng';
    this.vnLanguage.postManagementErrorStartAfterEnd = 'Ngày bắt đầu cần nhỏ hơn hoặc bằng ngày kết thúc';
    this.vnLanguage.postManagementFilter = 'Lọc';
    this.vnLanguage.postManagementTablePostName = 'Tên Bài viết';
    this.vnLanguage.postManagementTablePostAuthor = 'Tác giả';
    this.vnLanguage.postManagementTablePostCreationTime = 'Thời gian';
    this.vnLanguage.postManagementTablePostCategories = 'Thể loại';
    this.vnLanguage.postManagementTablePostStatus = 'Trạng thái';
    this.vnLanguage.postManagementTableAction = 'Hành động';
    this.vnLanguage.postManagementPostViewTitle = 'Xem trước bài viết';
    this.vnLanguage.postManagementPostViewOk = 'Ok';
    this.vnLanguage.postManagementApprove = 'Phê duyệt';
    this.vnLanguage.postManagementDeny = 'Từ chối';
    this.vnLanguage.postManagementCancel = 'Hủy';
    this.vnLanguage.postManagementPostApprovedBefore = 'Bài viết đã được duyệt trước đó';
    this.vnLanguage.postManagementPostNotFound = 'Không tìm thấy bài viết';
    this.vnLanguage.postManagementErrorChangeStatus = 'Lỗi khi thay đổi trạng thái';
    this.vnLanguage.postManagementDenyTitle = 'Từ chối bài viết';
    this.vnLanguage.postManagementDenyPostId = 'Mã bài viết';
    this.vnLanguage.postManagementDenyReason = 'Lý do';

    // For Policies
    this.vnLanguage.policiesTitle = 'Chính sách sử dụng';

    // For Home Page
    this.vnLanguage.homeIndexPostIn = 'Bài viết tại ';
  }

  /**
   * Set English for language variables
   * @name createEnglishDictionary
   * @author phieu-th
   */
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

    // For Menu in NavigationBar Component
    this.enLanguage.menuHome = 'Home';
    this.enLanguage.menuVNRegions = 'Vietnam\'s Regions';
    this.enLanguage.menuTravel = 'Travel';
    this.enLanguage.menuCuisine = 'Cuisine';
    this.enLanguage.menuPlans = 'Plans';
    this.enLanguage.menuTrend = 'Trend';
    this.enLanguage.menuPersonal = 'Personal';
    this.enLanguage.menuAbout = 'About Us';
    this.enLanguage.menuItemTheNorth = 'The North';
    this.enLanguage.menuItemTheCentral = 'The Central';
    this.enLanguage.menuItemTheSourth = 'The Sourth';
    this.enLanguage.menuItemHot = 'Hot';
    this.enLanguage.menuItemMostRecent = 'Most Recent';
    this.enLanguage.menuItemOneDay = '1 day';
    this.enLanguage.menuItemOneWeek = '2 - 7 days';
    this.enLanguage.menuItemMoreThanAWeek = 'More than 7 days';
    this.enLanguage.menuItemProfile = 'Personal Information';
    this.enLanguage.menuItemChangePassword = 'Change Password';
    this.enLanguage.menuItemContribution = 'Contribution';
    this.enLanguage.menuItemPolicies = 'Policies';
    this.enLanguage.menuItemFeedback = 'Feedback';

    // For Notification
    this.enLanguage.notificationFrom = 'From ';

    // For Post Management
    this.enLanguage.postManagementTitle = 'Post Management';
    this.enLanguage.postManagementStartDate = 'From: ';
    this.enLanguage.postManagementEndDate = 'To: ';
    this.enLanguage.postManagementApproved = 'Approved';
    this.enLanguage.postManagementPending = 'Pending';
    this.enLanguage.postManagementDenied = 'Denied';
    this.enLanguage.postManagementAllPost = 'All Posts';
    this.enLanguage.postManagementErrorEmptyDate = 'Empty start date or end date, enter them to filter';
    this.enLanguage.postManagementErrorInvalidDate = 'Invalid date format';
    this.enLanguage.postManagementErrorStartAfterEnd = 'Start date need equal or earlier than end date';
    this.enLanguage.postManagementFilter = 'Filter';
    this.enLanguage.postManagementTablePostName = 'Title';
    this.enLanguage.postManagementTablePostAuthor = 'Author';
    this.enLanguage.postManagementTablePostCreationTime = 'Creation Time';
    this.enLanguage.postManagementTablePostCategories = 'Categories';
    this.enLanguage.postManagementTablePostStatus = 'Status';
    this.enLanguage.postManagementTableAction = 'Action';
    this.enLanguage.postManagementPostViewTitle = 'Review';
    this.enLanguage.postManagementPostViewOk = 'Ok';
    this.enLanguage.postManagementApprove = 'Approve';
    this.enLanguage.postManagementDeny = 'Deny';
    this.enLanguage.postManagementCancel = 'Cancel';
    this.enLanguage.postManagementPostApprovedBefore = 'This post was approved before';
    this.enLanguage.postManagementPostNotFound = 'Post not found';
    this.enLanguage.postManagementErrorChangeStatus = 'Change post status has error, please try again';
    this.enLanguage.postManagementDenyTitle = 'Deny a post';
    this.enLanguage.postManagementDenyPostId = 'Post ID';
    this.enLanguage.postManagementDenyReason = 'Reason';

    // For Policies
    this.enLanguage.policiesTitle = 'Using Policies';

    this.enLanguage.homeIndexPostIn = 'Posts in ';
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
