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
    this.vnLanguage.headerUserContribution = 'Đóng góp';

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
    this.vnLanguage.menuFilter = 'Bộ lọc';
    this.vnLanguage.menuAbout = 'Về chúng tôi';
    this.vnLanguage.menuItemTheNorth = 'Miền Bắc';
    this.vnLanguage.menuItemTheCentral = 'Miền Trung';
    this.vnLanguage.menuItemTheSouth = 'Miền Nam';
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
    this.vnLanguage.notificationNeedLogin = 'Đăng nhập để xem thông báo của bạn ';
    this.vnLanguage.notificationNoMessage = 'Không có thông báo mới';

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
    this.vnLanguage.postManagementErrorEmptyReason = 'Lý do từ chối là bắt buộc';
    this.vnLanguage.postManagementErrorInvalidDenyData = 'Thông tin bài viết khớp';
    this.vnLanguage.postManagementErrorPostDenied = 'Bài viết đã từ chối trước đó';

    // For Policies
    this.vnLanguage.policiesTitle = 'Chính sách sử dụng';

    // For Home Page
    this.vnLanguage.homeIndexPostIn = 'Bài viết tại ';

    // For Create Post
    this.vnLanguage.createPostTitle = 'Tiêu đề:';
    this.vnLanguage.createPostTitlePlaceholder = 'Nhập tiêu đề bài viết';
    this.vnLanguage.createPostDescription = 'Mô tả:';
    this.vnLanguage.createPostDescriptionPlaceholder = 'Nhập nội dung mô tả bài viết';
    this.vnLanguage.createPostAddCoverBtn = 'Ảnh bìa';
    this.vnLanguage.createPostCategory = 'Thể loại:';
    this.vnLanguage.createPostTag = 'Gắn thẻ:';
    this.vnLanguage.createPostTagPlaceholder = 'Nhập nội dung thẻ mới';
    this.vnLanguage.createPostAddTagBtn = 'Thêm';
    this.vnLanguage.createPostPlace = 'Địa điểm:';
    this.vnLanguage.createPostPlacePlaceholder = 'Nhập tên địa điểm';
    this.vnLanguage.createPostAddress = 'Địa chỉ:';
    this.vnLanguage.createPostAddressPlaceholder = 'Nhập địa chỉ';
    this.vnLanguage.createPostProvinceCity = 'Tỉnh thành:';
    this.vnLanguage.createPostFindProvinceCity = 'Tìm tỉnh thành';
    this.vnLanguage.createPostTopic = 'Nội dung bài viết:';
    this.vnLanguage.createPostTopicTitle = 'Tiêu đề:';
    this.vnLanguage.createPostTopicTitlePlaceholder = 'Nhập tiêu đề đoạn văn';
    this.vnLanguage.createPostTopicContent = 'Nội dung:';
    this.vnLanguage.createPostTopicContentPlaceholder = 'Nhập nội dung đoạn văn';
    this.vnLanguage.createPostTopicAddImgBtn = 'Thêm ảnh';
    this.vnLanguage.createPostTopicImgDescription = 'Nhập nội dung mô tả hình ảnh';
    this.vnLanguage.createPostSaveBtn = 'Lưu';
    this.vnLanguage.createPostCancelBtn = 'Hủy';
    this.vnLanguage.createPostInvalidTitleLength = 'Tiêu đề bài viết quá dài!';
    this.vnLanguage.createPostInvalidTitleEmpty = 'Tiêu đề bài viết không được để trống!';
    this.vnLanguage.createPostInvalidDescLength = 'Mô tả bài viết quá dài!';
    this.vnLanguage.createPostInvalidDescEmpty = 'Mô tả bài viết không được để trống!';
    this.vnLanguage.createPostInvalidCoverEmpty = 'Ảnh bìa không được để trống!';
    this.vnLanguage.createPostInvalidCategoryEmpty = 'Thể loại bài viết không được để trống!';
    this.vnLanguage.createPostInvalidTagLength = 'Không thể gắn thẻ quá dài!';
    this.vnLanguage.createPostInvalidPlaceLength = 'Địa điểm quá dài!';
    this.vnLanguage.createPostInvalidPlaceEmpty = 'Địa điểm không được để trống!';
    this.vnLanguage.createPostInvalidAddressLength = 'Địa chỉ quá dài!';
    this.vnLanguage.createPostInvalidProvinceEmpty = 'Tỉnh Thành-phố không được để trống!';
    this.vnLanguage.createPostInvalidTopicEmpty = 'Nội dung bài viết không được để trống!';
    this.vnLanguage.createPostAlertSaveSuccess = 'Đã lưu bài viết thành công, nhấn vào để xem lại.';
    this.vnLanguage.createPostAlertSaveAlready = 'Bài viết của bạn đã được lưu rồi, không thể lưu thêm nữa!';

    // For Region
    this.vnLanguage.regionTheNorth = 'Miền Bắc';
    this.vnLanguage.regionTheCentral = 'Miền Trung';
    this.vnLanguage.regionTheSouth = 'Miền Nam';
    this.vnLanguage.regionPostRatio = 'Tỉ lệ số lượng bài viết';

    // For Trend
    this.vnLanguage.trendSearchCharTitle = 'Xu hướng tìm kiếm';
    this.vnLanguage.trendSearchChartDes = 'Từ khóa tìm kiếm nhiều nhất: ';
    this.vnLanguage.trendPostViewChartTitle = 'Xu hướng xem bài viết';
    this.vnLanguage.trendTop10PostViewAmount = 'Top 10 bài viết được xem nhiều nhất';

    // For Travel and Cuisine Filter
    this.vnLanguage.filterTheMostAmountOfViewPost = 'Bài viết được xem nhiều nhất';
    this.vnLanguage.filterTheMostAmountOfView = 'Số lượt xem: ';
    this.vnLanguage.filterFullTitle = 'Bộ lọc bài viết';
    this.vnLanguage.filterFullCategory = 'Thể loại';
    this.vnLanguage.filterFullKeyword = 'Từ khóa';
    this.vnLanguage.filterFullRegion = 'Vùng miền';
    this.vnLanguage.filterFullFilter = 'Lọc';

    // For User Module
    this.vnLanguage.userPostManagementTitle = 'Bài viết đóng góp';
    this.vnLanguage.userPostManagementApproved = 'Đã duyệt';
    this.vnLanguage.userPostManagementPending = 'Đang chờ';
    this.vnLanguage.userPostManagementDenied = 'Từ chối';
    this.vnLanguage.userPostManagementAllPost = 'Tất cả';
    this.vnLanguage.userPostManagementEnterPostTitle = 'Nhập tên bài viết';
    this.vnLanguage.userPostManagementTablePostName = 'Tên bài viết';
    this.vnLanguage.userPostManagementTablePostCreationTime = 'Thời gian';
    this.vnLanguage.userPostManagementTablePostCategories = 'Thể loại';
    this.vnLanguage.userPostManagementTablePostStatus = 'Trạng thái';
    this.vnLanguage.userPostManagementTableAction = 'Hành động';
    this.vnLanguage.userPostManagementEditTitle = 'Cập nhật bài viết';
    this.vnLanguage.userPostManagementEditMessage = 'Cập nhật nội dung bài viết sẽ đưa bài viết vào trạng thái chờ phệ duyệt';
    this.vnLanguage.userPostManagementEditCancel = 'Hủy';
    this.vnLanguage.userPostManagementEditOK = 'OK';
    this.vnLanguage.userPostManagementPostTimeTitle = 'Thời gian viết bài';
    this.vnLanguage.userPostManagementPostTimeOneWeek = 'Trong một tuần';
    this.vnLanguage.userPostManagementPostTimeOneMonth = 'Trong một tháng';
    this.vnLanguage.userPostManagementPostTimeAll = 'Tất cả';
    this.vnLanguage.userPostManagementListPostEmpty = 'Không có bài viết trong danh sách';

    // For Pessmission
    this.vnLanguage.permissionTitle = 'Danh sách phân quyền';
    this.vnLanguage.permissionSearchHint = 'Nhập tài khoản';
    this.vnLanguage.permissionSetPermission = 'Đặt quyền hạn';
    this.vnLanguage.permissionBlock = 'Khoá tài khoản';
    this.vnLanguage.permissionConfirmTitle = 'Xác nhập thay đổi';
    this.vnLanguage.permissionTypeConfirmPassword = 'Nhập mật khẩu của bạn';
    this.vnLanguage.permissionConfirmOk = 'Ok';
    this.vnLanguage.permissionConfirmCancel = 'Huỷ';
    this.vnLanguage.permissionUpdatePermission = 'Cập nhật quyền hạn';
    this.vnLanguage.permissionChoosePermission = 'Chọn phân quyền';
    this.vnLanguage.permissionMessIncorrectData = 'Dữ liệu cập nhật không đúng';
    this.vnLanguage.permissionMessIncorrectPassword = 'Mật khẩu xác thực không đúng';
    this.vnLanguage.permissionMessServerError = 'Lỗi hệ thống';
    this.vnLanguage.permissionMessUpdatedSuccess = 'Cập nhật thành công';
    this.vnLanguage.permissionMessUpdatedFail = 'Cập nhật thất bại, vui lòng thử lại';
    this.vnLanguage.permissionUpdatePermissionTitle = 'Cập nhật quyền hạn:';
    this.vnLanguage.perrmisionSendNotifyTitle = 'Gửi thông báo:';
    this.vnLanguage.permissionSend = 'Gửi';
    this.vnLanguage.permissionEnterNotify = 'Nhập nội dung thông báo';
    this.vnLanguage.permissionBlockTitle = 'Khoá tài khoản';
    this.vnLanguage.permissionBlockReason = 'Lý do khoá';

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
    this.enLanguage.headerUserContribution = 'Contribution';

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
    this.enLanguage.menuFilter = 'Filter';
    this.enLanguage.menuPersonal = 'Personal';
    this.enLanguage.menuAbout = 'About Us';
    this.enLanguage.menuItemTheNorth = 'The North';
    this.enLanguage.menuItemTheCentral = 'The Central';
    this.enLanguage.menuItemTheSouth = 'The South';
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
    this.enLanguage.notificationNeedLogin = 'Login to see messages';
    this.enLanguage.notificationNoMessage = 'No recent message';

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
    this.enLanguage.postManagementErrorEmptyReason = 'Deny reason is required';
    this.enLanguage.postManagementErrorInvalidDenyData = 'Post information is not match';
    this.enLanguage.postManagementErrorPostDenied = 'Post was denied before';

    // For Policies
    this.enLanguage.policiesTitle = 'Using Policies';

    // For Home Page
    this.enLanguage.homeIndexPostIn = 'Posts in ';

    // For Create Post
    this.enLanguage.createPostTitle = 'Title:';
    this.enLanguage.createPostTitlePlaceholder = 'Enter post title';
    this.enLanguage.createPostDescription = 'Description:';
    this.enLanguage.createPostDescriptionPlaceholder = 'Enter post description';
    this.enLanguage.createPostAddCoverBtn = 'Add Cover';
    this.enLanguage.createPostCategory = 'Category:';
    this.enLanguage.createPostTag = 'Tag:';
    this.enLanguage.createPostTagPlaceholder = 'Enter new tag';
    this.enLanguage.createPostAddTagBtn = 'Add';
    this.enLanguage.createPostPlace = 'Place:';
    this.enLanguage.createPostPlacePlaceholder = 'Enter place name';
    this.enLanguage.createPostAddress = 'Address:';
    this.enLanguage.createPostAddressPlaceholder = 'Enter address';
    this.enLanguage.createPostProvinceCity = 'Province City:';
    this.enLanguage.createPostFindProvinceCity = 'Find province city';
    this.enLanguage.createPostTopic = 'Post contents:';
    this.enLanguage.createPostTopicTitle = 'Title:';
    this.enLanguage.createPostTopicTitlePlaceholder = 'Enter paragraph title';
    this.enLanguage.createPostTopicContent = 'Content:';
    this.enLanguage.createPostTopicContentPlaceholder = 'Enter paragraph content';
    this.enLanguage.createPostTopicAddImgBtn = 'Add image';
    this.enLanguage.createPostTopicImgDescription = 'Enter image description';
    this.enLanguage.createPostSaveBtn = 'Save';
    this.enLanguage.createPostCancelBtn = 'Cancel';
    this.enLanguage.createPostInvalidTitleLength = 'Post title can not be too long!';
    this.enLanguage.createPostInvalidTitleEmpty = 'Post title can not be empty!';
    this.enLanguage.createPostInvalidDescLength = 'Post description can not be too long!';
    this.enLanguage.createPostInvalidDescEmpty = 'Post description can not be empty!';
    this.enLanguage.createPostInvalidCoverEmpty = 'Cover can not be empty!';
    this.enLanguage.createPostInvalidCategoryEmpty = 'Post category can not be empty!';
    this.enLanguage.createPostInvalidTagLength = 'Can not add too long tag!';
    this.enLanguage.createPostInvalidPlaceLength = 'Place can not be too long!';
    this.enLanguage.createPostInvalidPlaceEmpty = 'Place can not be empty!';
    this.enLanguage.createPostInvalidAddressLength = 'Address can not be too long!';
    this.enLanguage.createPostInvalidProvinceEmpty = 'Province-City can not be empty!';
    this.enLanguage.createPostInvalidTopicEmpty = 'Post content can not be empty!';
    this.enLanguage.createPostAlertSaveSuccess = 'Your post was saved successfully, click to see.';
    this.enLanguage.createPostAlertSaveAlready = 'Your post was saved, can\'t save any more!';

    // For Region
    this.enLanguage.regionTheNorth = 'The North';
    this.enLanguage.regionTheCentral = 'The Central';
    this.enLanguage.regionTheSouth = 'The South';
    this.enLanguage.regionPostRatio = 'Amount Posts Ratio';

    // For Trend
    this.enLanguage.trendSearchCharTitle = 'Search Trend';
    this.enLanguage.trendSearchChartDes = 'The most searched keyword: ';
    this.enLanguage.trendPostViewChartTitle = 'View Post Trend';
    this.enLanguage.trendTop10PostViewAmount = 'Top 10 of view amount post';

    // For Travel and Cuisine Filter
    this.enLanguage.filterTheMostAmountOfViewPost = 'Most view Post';
    this.enLanguage.filterTheMostAmountOfView = 'View Amount: ';
    this.enLanguage.filterFullTitle = 'Post Filter';
    this.enLanguage.filterFullCategory = 'Category';
    this.enLanguage.filterFullKeyword = 'Keyword';
    this.enLanguage.filterFullRegion = 'Region';
    this.enLanguage.filterFullFilter = 'Filter';

    // For User Module
    this.enLanguage.userPostManagementTitle = 'Contribution Posts';
    this.enLanguage.userPostManagementApproved = 'Approved';
    this.enLanguage.userPostManagementPending = 'Pending';
    this.enLanguage.userPostManagementDenied = 'Denied';
    this.enLanguage.userPostManagementAllPost = 'All Post';
    this.enLanguage.userPostManagementEnterPostTitle = 'Enter Post\'s title';
    this.enLanguage.userPostManagementTablePostName = 'Title';
    this.enLanguage.userPostManagementTablePostCreationTime = 'Creation Time';
    this.enLanguage.userPostManagementTablePostCategories = 'Categories';
    this.enLanguage.userPostManagementTablePostStatus = 'Status';
    this.enLanguage.userPostManagementTableAction = 'Action';
    this.enLanguage.userPostManagementEditTitle = 'Edit Post';
    this.enLanguage.userPostManagementEditMessage = 'Edit Post\'s content will send it to pending list';
    this.enLanguage.userPostManagementEditCancel = 'Cancel';
    this.enLanguage.userPostManagementEditOK = 'Ok';
    this.enLanguage.userPostManagementPostTimeTitle = 'Creation Time ';
    this.enLanguage.userPostManagementPostTimeOneWeek = 'In a week';
    this.enLanguage.userPostManagementPostTimeOneMonth = 'In a month';
    this.enLanguage.userPostManagementPostTimeAll = 'All time';
    this.enLanguage.userPostManagementListPostEmpty = 'List Posts is empty';

    // For Pessmission
    this.enLanguage.permissionTitle = 'Users Permission';
    this.enLanguage.permissionSearchHint = 'Type username';
    this.enLanguage.permissionSetPermission = 'Set User Permission';
    this.enLanguage.permissionBlock = 'Block Account';
    this.enLanguage.permissionConfirmTitle = 'Confirm change';
    this.enLanguage.permissionTypeConfirmPassword = 'Type your password';
    this.enLanguage.permissionConfirmOk = 'Ok';
    this.enLanguage.permissionConfirmCancel = 'Cancel';
    this.enLanguage.permissionUpdatePermission = 'Update Permission';
    this.enLanguage.permissionChoosePermission = 'Choose Permissions';
    this.enLanguage.permissionMessIncorrectData = 'Incorrect Update data';
    this.enLanguage.permissionMessIncorrectPassword = 'Incorrect Password';
    this.enLanguage.permissionMessServerError = 'System Error';
    this.enLanguage.permissionMessUpdatedSuccess = 'Updated Success!';
    this.enLanguage.permissionMessUpdatedFail = 'Updated Fail, Try again';
    this.enLanguage.permissionUpdatePermissionTitle = 'Update permision:';
    this.enLanguage.perrmisionSendNotifyTitle = 'Notify:';
    this.enLanguage.permissionSend = 'Send';
    this.enLanguage.permissionEnterNotify = 'Enter notification content';
    this.enLanguage.permissionBlockTitle = 'Block Account';
    this.enLanguage.permissionBlockReason = 'Block Reason';
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
