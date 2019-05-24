import { Language } from './language.model';

export const LangVietnamese: Language = {
  // Common
  common: {
    ok: 'Ok',
    cancel: 'Huỷ',
    thisFieldIsRequired: 'Điền nội dung này được yêu cầu',
    enter: 'Nhập ',
    next: 'Trang tiếp',
    prev: 'Trang trước',
    from: 'Từ',
    to: 'Đến',
    choose: 'Chọn '
  },

  // Layout
  compLayout: {
    tooltipNewPost: 'Thêm bài viết',
    tooltipPostManagement: 'Quản lý bài viết',
    tooltipUserManagement: 'Quản lý người dùng',
    tooltipNewTour: 'Thêm tour',
    tooltipTourManagement: 'Quản lý tour'
  },

  // For Header Component
  compHeader: {
    headerVietnamese: 'Tiếng Việt',
    headerEnglish: 'Tiếng Anh',
    headerHi: 'Xin chào, ',
    headerLogin: 'Đăng nhập',
    headerRegister: 'Đăng ký',
    headerQuestionToLogin: 'Bạn muốn đăng nhập chứ?',
    headerSearch: 'Tìm kiếm',
    headerPersonalInfo: 'Thông tin cá nhân',
    headerLogOut: 'Đăng xuất',
    headerUserContribution: 'Đóng góp'
  },

  // For Login
  compLogin: {
    loginTitle: 'ĐĂNG NHẬP',
    loginUsername: 'Tên Đăng nhập',
    loginPassword: 'Mật khẩu',
    loginSignIn: 'Đăng nhập',
    loginSignInWithGoogle: ' Đăng nhập bằng Tài khoản ',
    loginNotRegister: 'Chưa có Tài khoản ',
    loginCreatAnAccount: 'Tạo Tài khoản ngay',
    loginErrorUsernameRequired: 'Tên đăng nhập là bắt buộc',
    loginErrorUsernameLength: 'Tên đăng nhập dài từ 6 - 30 ký tự',
    loginErrorUsernamePattern: 'Tên đăng nhập bao gồm chữ, số, dấu _, @ và - ',
    loginErrorPasswordRequired: 'Mật khẩu là bắt buộc',
    loginErrorPasswordLength: 'Mật khẩu dài từ 8 ký tự',
    loginEnterUsername: 'Nhập Tên đăng nhập',
    loginEnterPassword: 'Nhập Mật khẩu'
  },

  // For Register Component
  compRegister: {
    registerTitle: 'ĐĂNG KÝ',
    registerFirstName: 'Tên',
    registerLastName: 'Họ: ',
    registerUsername: 'Tên đăng nhập',
    registerPassword: 'Mật khẩu',
    registerConfirmPassword: 'Nhập lại mật khẩu',
    registerAcceptPolicies: 'Tôi đồng ý với chính sách sử dụng ứng dụng',
    registerRegister: 'Đăng ký',
    registerBackToHome: 'Quay về Trang chủ',
    registerBackToLogin: 'Quay về Đăng nhập',
    registerErrorFirstNameRequired: 'Tên là bắt buộc',
    registerErrorUsernameRequired: 'Tên đăng nhập là bắt buộc',
    registerErrorUsernameLength: 'Tên đăng nhập dài từ 6 - 30 ký tự',
    registerErrorUsernamePattern:
      'Tên đăng nhập bao gồm chữ, số, dấu _, @ và - ',
    registerErrorPasswordRequired: 'Mật khẩu là bắt buộc',
    registerErrorPasswordLength: 'Mật khẩu dài từ 8 ký tự',
    registerErrorPasswordPattern: 'Mật khẩu gồm chữ in hoa, chữ thường và số',
    registerEnterFirstname: 'Nhập tên',
    registerEnterLastname: 'Nhập họ',
    registerEnterUsername: 'Nhập Tên đăng nhập',
    registerEnterPassword: 'Nhập mật khẩu',
    registerEnterConfirmPassword: 'Nhập lại mật khẩu'
  },

  // For Feedback Component
  compFeedback: {
    feedbackTitle: 'Phản hồi',
    feedbackName: 'Tên Phản hồi',
    feedbackKindOf: 'Loại phản hồi',
    feedbackUsername: 'Tên người gửi',
    feedbackAdditionalContact: 'Thông tin liên hệ bổ sung',
    feedbackContent: 'Nội dung Phản hồi',
    feedbackAboutSystem: 'Về Hệ thống',
    feedbackAboutContent: 'Về Nội dung',
    feedbackAboutUser: 'Về Người dùng',
    feedbackAboutPolicies: 'Về Chính sách sử dụng',
    feedbackAboutOthers: 'Về các nội dung khác',
    feedbackEnterName: 'Nhập Tên phản hồi',
    feedbackEnterUsername: 'Nhập Tên người phản hồi',
    feedbackEnterAdditionalContact: 'Nhập thông tin liên hệ bổ sung',
    feedbackEnterContent: 'Nhập nội dung phản hồi',
    feedbackSubmit: 'Gửi phản hồi',
    feedbackCancel: 'Hủy',
    feedbackErrorNameRequired: 'Tên Phản hồi là bắt buộc',
    feedbackErrorKindOfRequired: 'Chọn loại Phản hồi là bắt buộc',
    feedbackErrorContentRequired: 'Điền nội dung phản hồi là bắt buộc',
    feedbackSuccess: 'Gửi phản hồi thành công, cảm ơn bạn đã đóng góp',
    feedbackFail: 'Phản hồi thất bại, vui lòng thử lại'
  },

  // For Menu in NavigationBar Component
  compNavigationBar: {
    menuHome: 'Trang chủ',
    menuVNRegions: 'Vùng miền Việt Nam',
    menuTravel: 'Du lịch',
    menuCuisine: 'Ẩm thực',
    menuPlans: 'Kế hoạch',
    menuTrend: 'Xu hướng',
    menuPersonal: 'Cá nhân',
    menuFilter: 'Bộ lọc',
    menuAbout: 'Về chúng tôi',
    menuItemTheNorth: 'Miền Bắc',
    menuItemTheCentral: 'Miền Trung',
    menuItemTheSouth: 'Miền Nam',
    menuItemHot: 'Nổi bật',
    menuItemMostRecent: 'Gần đây nhất',
    menuItemOneDay: '1 Ngày',
    menuItemOneWeek: '2 - 7 Ngày',
    menuItemMoreThanAWeek: 'Từ 7 ngày',
    menuItemProfile: 'Thông tin cá nhân',
    menuItemChangePassword: 'Thay đổi mật khẩu',
    menuItemContribution: 'Đóng góp',
    menuItemPolicies: 'Chính sách sử dụng',
    menuItemFeedback: 'Phản hồi'
  },

  // For Notification
  compNotification: {
    notificationNeedLogin: 'Đăng nhập để xem thông báo của bạn ',
    notificationNoMessage: 'Không có thông báo mới'
  },

  // For Post Management
  compPostManagement: {
    postManagementTitle: 'Quản lý bài viết',
    postManagementStartDate: 'Từ:',
    postManagementEndDate: 'Đến:',
    postManagementApproved: 'Đã phê duyệt',
    postManagementPending: 'Đang chờ',
    postManagementDenied: 'Từ chối',
    postManagementAllPost: 'Tất cả',
    postManagementErrorEmptyDate: 'Nhập ngày bắt đầu và ngày kết thúc để lọc',
    postManagementErrorInvalidDate: 'Định dạng ngày tháng chưa đúng',
    postManagementErrorStartAfterEnd:
      'Ngày bắt đầu cần nhỏ hơn hoặc bằng ngày kết thúc',
    postManagementFilter: 'Lọc',
    postManagementTablePostName: 'Tên Bài viết',
    postManagementTablePostAuthor: 'Tác giả',
    postManagementTablePostCreationTime: 'Thời gian',
    postManagementTablePostCategories: 'Thể loại',
    postManagementTablePostStatus: 'Trạng thái',
    postManagementTableAction: 'Hành động',
    postManagementPostViewTitle: 'Xem trước bài viết',
    postManagementPostViewOk: 'Ok',
    postManagementApprove: 'Phê duyệt',
    postManagementDeny: 'Từ chối',
    postManagementCancel: 'Hủy',
    postManagementPostApprovedBefore: 'Bài viết đã được duyệt trước đó',
    postManagementPostNotFound: 'Không tìm thấy bài viết',
    postManagementErrorChangeStatus: 'Lỗi khi thay đổi trạng thái',
    postManagementDenyTitle: 'Từ chối bài viết',
    postManagementDenyPostId: 'Mã bài viết',
    postManagementDenyReason: 'Lý do',
    postManagementErrorEmptyReason: 'Lý do từ chối là bắt buộc',
    postManagementErrorInvalidDenyData: 'Thông tin bài viết khớp',
    postManagementErrorPostDenied: 'Bài viết đã từ chối trước đó'
  },

  // For Policies
  compPolicies: { policiesTitle: 'Chính sách sử dụng' },

  // For Home Page
  pageHome: { homeIndexPostIn: 'Bài viết tại ' },

  // For Create Post
  compCreatePost: {
    createPostTitle: 'Tiêu đề:',
    createPostTitlePlaceholder: 'Nhập tiêu đề bài viết',
    createPostDescription: 'Mô tả:',
    createPostDescriptionPlaceholder: 'Nhập nội dung mô tả bài viết',
    createPostAddCoverBtn: 'Ảnh bìa',
    createPostCategory: 'Thể loại:',
    createPostTag: 'Gắn thẻ:',
    createPostTagPlaceholder: 'Nhập nội dung thẻ mới',
    createPostAddTagBtn: 'Thêm',
    createPostPlace: 'Địa điểm:',
    createPostPlacePlaceholder: 'Nhập tên địa điểm',
    createPostAddress: 'Địa chỉ:',
    createPostAddressPlaceholder: 'Nhập địa chỉ',
    createPostProvinceCity: 'Tỉnh thành:',
    createPostFindProvinceCity: 'Tìm tỉnh thành',
    createPostTopic: 'Nội dung bài viết:',
    createPostTopicTitle: 'Tiêu đề:',
    createPostTopicTitlePlaceholder: 'Nhập tiêu đề đoạn văn',
    createPostTopicContent: 'Nội dung:',
    createPostTopicContentPlaceholder: 'Nhập nội dung đoạn văn',
    createPostTopicAddImgBtn: 'Thêm ảnh',
    createPostTopicImgDescription: 'Nhập nội dung mô tả hình ảnh',
    createPostSaveBtn: 'Lưu',
    createPostCancelBtn: 'Hủy',
    createPostInvalidTitleLength: 'Tiêu đề bài viết quá dài!',
    createPostInvalidTitleEmpty: 'Tiêu đề bài viết không được để trống!',
    createPostInvalidDescLength: 'Mô tả bài viết quá dài!',
    createPostInvalidDescEmpty: 'Mô tả bài viết không được để trống!',
    createPostInvalidCoverEmpty: 'Ảnh bìa không được để trống!',
    createPostInvalidCategoryEmpty: 'Thể loại bài viết không được để trống!',
    createPostInvalidTagLength: 'Không thể gắn thẻ quá dài!',
    createPostInvalidPlaceLength: 'Địa điểm quá dài!',
    createPostInvalidPlaceEmpty: 'Địa điểm không được để trống!',
    createPostInvalidAddressLength: 'Địa chỉ quá dài!',
    createPostInvalidProvinceEmpty: 'Tỉnh Thành-phố không được để trống!',
    createPostInvalidTopicEmpty: 'Nội dung bài viết không được để trống!',
    createPostAlertSaveSuccess:
      'Đã lưu bài viết thành công, nhấn vào để xem lại.',
    createPostAlertSaveAlready:
      'Bài viết của bạn đã được lưu rồi, không thể lưu thêm nữa!'
  },

  // For Region
  compFilterbyRegion: {
    regionTheNorth: 'Miền Bắc',
    regionTheCentral: 'Miền Trung',
    regionTheSouth: 'Miền Nam',
    regionPostRatio: 'Tỉ lệ số lượng bài viết'
  },

  // For Trend
  pageTrend: {
    trendSearchCharTitle: 'Xu hướng tìm kiếm',
    trendSearchChartDes: 'Từ khóa tìm kiếm nhiều nhất: ',
    trendPostViewChartTitle: 'Xu hướng xem bài viết',
    trendTop10PostViewAmount: 'Top 10 bài viết được xem nhiều nhất'
  },

  // For Travel and Cuisine Filter
  pageFilter: {
    filterTheMostAmountOfViewPost: 'Bài viết được xem nhiều nhất',
    filterTheMostAmountOfView: 'Số lượt xem: ',
    filterFullTitle: 'Bộ lọc bài viết',
    filterFullCategory: 'Thể loại',
    filterFullKeyword: 'Từ khóa',
    filterFullRegion: 'Vùng miền',
    filterFullFilter: 'Lọc'
  },

  // For User Module
  compUserPostManagement: {
    userPostManagementTitle: 'Bài viết đóng góp',
    userPostManagementApproved: 'Đã duyệt',
    userPostManagementPending: 'Đang chờ',
    userPostManagementDenied: 'Từ chối',
    userPostManagementAllPost: 'Tất cả',
    userPostManagementEnterPostTitle: 'Nhập tên bài viết',
    userPostManagementTablePostName: 'Tên bài viết',
    userPostManagementTablePostCreationTime: 'Thời gian',
    userPostManagementTablePostCategories: 'Thể loại',
    userPostManagementTablePostStatus: 'Trạng thái',
    userPostManagementTableAction: 'Hành động',
    userPostManagementEditTitle: 'Cập nhật bài viết',
    userPostManagementEditMessage:
      'Cập nhật nội dung bài viết sẽ đưa bài viết vào trạng thái chờ phệ duyệt',
    userPostManagementEditCancel: 'Hủy',
    userPostManagementEditOK: 'OK',
    userPostManagementPostTimeTitle: 'Thời gian viết bài',
    userPostManagementPostTimeOneWeek: 'Trong một tuần',
    userPostManagementPostTimeOneMonth: 'Trong một tháng',
    userPostManagementPostTimeAll: 'Tất cả',
    userPostManagementListPostEmpty: 'Không có bài viết trong danh sách'
  },

  // For Pessmission
  compPermissionManagement: {
    permissionTitle: 'Danh sách phân quyền',
    permissionSearchHint: 'Nhập tài khoản',
    permissionSetPermission: 'Đặt quyền hạn',
    permissionBlock: 'Khoá tài khoản',
    permissionConfirmTitle: 'Xác nhập thay đổi',
    permissionTypeConfirmPassword: 'Nhập mật khẩu của bạn',
    permissionConfirmOk: 'Ok',
    permissionConfirmCancel: 'Huỷ',
    permissionUpdatePermission: 'Cập nhật quyền hạn',
    permissionChoosePermission: 'Chọn phân quyền',
    permissionMessIncorrectData: 'Dữ liệu cập nhật không đúng',
    permissionMessIncorrectPassword: 'Mật khẩu xác thực không đúng',
    permissionMessServerError: 'Lỗi hệ thống',
    permissionMessUpdatedSuccess: 'Cập nhật thành công',
    permissionMessUpdatedFail: 'Cập nhật thất bại, vui lòng thử lại',
    permissionUpdatePermissionTitle: 'Cập nhật quyền hạn',
    perrmisionSendNotifyTitle: 'Gửi thông báo:',
    permissionSend: 'Gửi',
    permissionEnterNotify: 'Nhập nội dung thông báo',
    permissionBlockTitle: 'Khoá tài khoản',
    permissionBlockReason: 'Lý do khoá',
    permissionUnBlockTitle: 'Mở khoá tài khoản',
    // For block message
    blockPolicyViolation: 'Vi phạm chính sách sử dụng',
    blockAccountImpersonation: 'Tài khoản giả mạo',
    blockOffensiveBehavior: 'Hành vi chống phá, phản cảm'
  },

  // For add tour
  compAddTour: {
    addTourInfoTitle: 'Tóm tắt Tour',
    addTourGuideInfoTitle: 'thay ghi ben model ma ben nay chua co',
    addTourSchedulesTitle: 'Kế hoạch chi tiết',
    addTourPreparationTitle: 'Chuẩn bị chi tiết',
    addTourName: 'Tên tour',
    addTourBeginTime: 'Ngày khởi hành',
    addTourDays: 'Thời lượng',
    addTourPlace: 'Địa điểm',
    addTourEnterName: 'Nhập tên tour',
    addTourDesc: 'Mô tả',
    addTourEnterDesc: 'Nhập mô tả',
    addTourEndTime: 'Ngày quay về',
    addTourEndFeedbackTime: 'Hạn chót góp ý kiến',
    addTourEndRegisterTime: 'Hạn chót đăng ký',
    addTourTime: 'Thời gian',
    addTourProvince: 'Tỉnh Thành phố',
    addTourLocation: 'Địa điểm',
    addTourEnterLocation: 'Nhập Tên Địa điểm',
    addTourNewLocation: 'Địa điểm mới',
    addTourLocationName: 'Tên địa điểm',
    addTourLocationProvince: 'Thuộc tỉnh',
    addTourLocationGPS: 'Toạ độ GPS',
    addTourLocationAddress: 'Địa chỉ',
    addTourNoteSelectMore: 'Thuộc tính này có thể chọn nhiều lựa chọn',
    addTourAddSuccess: 'Thêm thành công',
    addTourAddFail: 'Thêm thất bại, thử lại',
    addTourCover: 'Ảnh bìa',
    addTourAddSchedule: 'Thêm kế hoạch chi tiết',
    addTourInputAllBefore: 'Vui lòng nhập tất cả giá trị',
    addTourScheduleCost: 'Chi phí theo kế hoạch: ',
    addTourLimitMembers: 'Số thành viên tối đa',
    addTourRegisterCost: 'Chi phí đăng ký',
    addTourTourguide: 'Dẫn đoàn',
    addTourContact: 'Liên hệ',
    addTourPeople: 'người',
    addTourItemPreparation: 'Chuẩn bị vật dụng',
    addTourAddPrepataion: 'Thêm vật dụng'
  },

  // Add Schedule
  compAddSchedule: {
    addScheduleDay: 'Ngày',
    addSchedulePeriod: 'Mốc thời gian',
    addScheduleKindof: 'Loại công việc',
    addScheduleKindMoving: 'Di chuyển',
    addScheduleKindEating: 'Ăn uống',
    addScheduleKindVisiting: 'Tham quan',
    addScheduleKindRelaxing: 'Nghỉ ngơi',
    addScheduleKindFreedom: 'Sinh hoạt tự do',
    addScheduleKindOthers: 'Khác',
    addSchedulePerform: 'Chịu trách nhiệm',
    addScheduleCost: 'Chi phí',
    addScheduleLocation: 'Địa điểm',
    addScheduleNote: 'Ghi chú',
    addScheduleAddTask: 'Add another task',
    addScheduleAddPerform: 'Add another perfrom',
    addScheduleSelectOneBefore: 'Current select has not been finished',
    addScheduleInvalidData: 'Invalid Data, please try again',
    addScheduleNotes: 'Notes'
  },

  compAddPreparation: {
    addPreparationItemName: 'Item name',
    addPreparationAmount: 'Amount',
    addPreparationUnit: 'Unit',
    addPreparationPerforms: 'Performs',
    addPreparationToAll: 'All Members',
    addPreparationSelectPerform: 'Select performs',
    addPreparationDeadline: 'Deadline',
    addPreparationNotes: 'Notes'
  }
};
