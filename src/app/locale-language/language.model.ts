export class Language {
  /**
   * phần ngôn ngữ cho component có dạng tiền tố 'comp' + 'tên component'
   * phần ngôn ngữ cho module có dạng tiền tố 'page' + 'tên module'
   * không cần ghi tiền tố phân biệt component như trước nữa,
   * vd: 'postManagementTablePostCreationTime'
   * giờ đã nằm trong compPostManagememt, có thể viết ngắn thành 'tablePostCreationTime'
   */

  // Common
  common: {
    ok: string;
    cancel: string;
    thisFieldIsRequired: string;
    enter: string;
    next: string;
    prev: string;
    from: string;
    to: string;
    choose: string;
    invalidInputData: string;
  };

  // Layout
  compLayout: {
    tooltipNewPost: string;
    tooltipPostManagement: string;
    tooltipUserManagement: string;
    tooltipNewTour: string;
    tooltipTourManagement: string;
  };

  // For Header Component
  compHeader: {
    headerHi: string;
    headerSearch: string;
    headerVietnamese: string;
    headerEnglish: string;
    headerLogin: string;
    headerRegister: string;
    headerQuestionToLogin: string;
    headerPersonalInfo: string;
    headerLogOut: string;
    headerUserContribution: string;
    headerUserTour: string;
    headerUpdateProfile: string;
  };

  // For Login Component
  compLogin: {
    loginTitle: string;
    loginUsername: string;
    loginPassword: string;
    loginSignIn: string;
    loginSignInWithGoogle: string;
    loginNotRegister: string;
    loginCreatAnAccount: string;
    loginErrorUsernameRequired: string;
    loginErrorUsernameLength: string;
    loginErrorUsernamePattern: string;
    loginErrorPasswordRequired: string;
    loginErrorPasswordLength: string;
    loginEnterUsername: string;
    loginEnterPassword: string;
  };

  // For Register Component
  compRegister: {
    registerTitle: string;
    registerFirstName: string;
    registerLastName: string;
    registerUsername: string;
    registerPassword: string;
    registerConfirmPassword: string;
    registerAcceptPolicies: string;
    registerRegister: string;
    registerBackToHome: string;
    registerBackToLogin: string;
    registerErrorFirstNameRequired: string;
    registerErrorUsernameRequired: string;
    registerErrorUsernameLength: string;
    registerErrorUsernamePattern: string;
    registerErrorPasswordRequired: string;
    registerErrorPasswordLength: string;
    registerErrorPasswordPattern: string;
    registerEnterFirstname: string;
    registerEnterLastname: string;
    registerEnterUsername: string;
    registerEnterPassword: string;
    registerEnterConfirmPassword: string;
  };

  // For Menu in NavigationBar Component
  compNavigationBar: {
    menuHome: string;
    menuVNRegions: string;
    menuTravel: string;
    menuCuisine: string;
    menuPlans: string;
    menuTrend: string;
    menuPersonal: string;
    menuAbout: string;
    menuFilter: string;
    menuItemTheNorth: string;
    menuItemTheCentral: string;
    menuItemTheSouth: string;
    menuItemHot: string;
    menuItemMostRecent: string;
    menuItemOneDay: string;
    menuItemOneWeek: string;
    menuItemMoreThanAWeek: string;
    menuItemProfile: string;
    menuItemChangePassword: string;
    menuItemContribution: string;
    menuItemPolicies: string;
    menuItemFeedback: string;
  };

  // For Feedback Component
  compFeedback: {
    feedbackTitle: string;
    feedbackName: string;
    feedbackKindOf: string;
    feedbackUsername: string;
    feedbackAdditionalContact: string;
    feedbackContent: string;
    feedbackAboutSystem: string;
    feedbackAboutContent: string;
    feedbackAboutUser: string;
    feedbackAboutPolicies: string;
    feedbackAboutOthers: string;
    feedbackEnterName: string;
    feedbackEnterUsername: string;
    feedbackEnterAdditionalContact: string;
    feedbackEnterContent: string;
    feedbackSubmit: string;
    feedbackCancel: string;
    feedbackErrorNameRequired: string;
    feedbackErrorKindOfRequired: string;
    feedbackErrorContentRequired: string;
    feedbackSuccess: string;
    feedbackFail: string;
  };

  // For Notification
  compNotification: {
    notificationNeedLogin: string;
    notificationNoMessage: string;
  };

  // For Post Manager
  compPostManagement: {
    postManagementTitle: string;
    postManagementStartDate: string;
    postManagementEndDate: string;
    postManagementApproved: string;
    postManagementPending: string;
    postManagementDenied: string;
    postManagementAllPost: string;
    postManagementErrorEmptyDate: string;
    postManagementErrorInvalidDate: string;
    postManagementErrorStartAfterEnd: string;
    postManagementFilter: string;
    postManagementTablePostName: string;
    postManagementTablePostAuthor: string;
    postManagementTablePostCreationTime: string;
    postManagementTablePostCategories: string;
    postManagementTablePostStatus: string;
    postManagementTableAction: string;
    postManagementPostViewTitle: string;
    postManagementPostViewOk: string;
    postManagementApprove: string;
    postManagementDeny: string;
    postManagementCancel: string;
    postManagementPostApprovedBefore: string;
    postManagementPostNotFound: string;
    postManagementErrorChangeStatus: string;
    postManagementDenyTitle: string;
    postManagementDenyPostId: string;
    postManagementDenyReason: string;
    postManagementErrorEmptyReason: string;
    postManagementErrorInvalidDenyData: string;
    postManagementErrorPostDenied: string;
  };

  // For Policies
  compPolicies: { policiesTitle: string };

  // For HomePage
  pageHome: {
    homeIndexPostIn: string,
    homeTourAvailable: string;
    homeTourBuilding: string;
    homeTourCloseFeedback: string;
  };

  pagePostView: {
    sendBtn: string
  };

  compTourBuilding: {
    sendBtn: string,
    notInFeedback: string
  };

  // For Create Post
  compCreatePost: {
    createPostTitle: string;
    createPostTitlePlaceholder: string;
    createPostDescription: string;
    createPostDescriptionPlaceholder: string;
    createPostAddCoverBtn: string;
    createPostCategory: string;
    createPostTag: string;
    createPostTagPlaceholder: string;
    createPostAddTagBtn: string;
    createPostPlace: string;
    createPostPlacePlaceholder: string;
    createPostAddress: string;
    createPostAddressPlaceholder: string;
    createPostProvinceCity: string;
    createPostFindProvinceCity: string;
    createPostTopic: string;
    createPostTopicTitle: string;
    createPostTopicTitlePlaceholder: string;
    createPostTopicContent: string;
    createPostTopicContentPlaceholder: string;
    createPostTopicAddImgBtn: string;
    createPostTopicImgDescription: string;
    createPostSaveBtn: string;
    createPostCancelBtn: string;
    createPostInvalidTitleLength: string;
    createPostInvalidTitleEmpty: string;
    createPostInvalidDescLength: string;
    createPostInvalidDescEmpty: string;
    createPostInvalidCoverEmpty: string;
    createPostInvalidCategoryEmpty: string;
    createPostInvalidTagLength: string;
    createPostInvalidPlaceLength: string;
    createPostInvalidPlaceEmpty: string;
    createPostInvalidAddressLength: string;
    createPostInvalidProvinceEmpty: string;
    createPostInvalidTopicEmpty: string;
    createPostAlertSaveSuccess: string;
    createPostAlertSaveAlready: string;
  };

  // For Region
  compFilterbyRegion: {
    regionTheNorth: string;
    regionTheCentral: string;
    regionTheSouth: string;
    regionPostRatio: string;
  };

  // For Trend
  pageTrend: {
    trendSearchCharTitle: string;
    trendSearchChartDes: string;
    trendPostViewChartTitle: string;
    trendTop10PostViewAmount: string;
  };

  // For Travel and Cuisine Filter
  pageFilter: {
    filterTheMostAmountOfViewPost: string;
    filterTheMostAmountOfView: string;
    filterFullTitle: string;
    filterFullCategory: string;
    filterFullKeyword: string;
    filterFullRegion: string;
    filterFullFilter: string;
  };

  // For User
  compUserPostManagement: {
    userPostManagementTitle: string;
    userPostManagementApproved: string;
    userPostManagementPending: string;
    userPostManagementDenied: string;
    userPostManagementAllPost: string;
    userPostManagementEnterPostTitle: string;
    userPostManagementTablePostName: string;
    userPostManagementTablePostCreationTime: string;
    userPostManagementTablePostCategories: string;
    userPostManagementTablePostStatus: string;
    userPostManagementTableAction: string;
    userPostManagementEditTitle: string;
    userPostManagementEditMessage: string;
    userPostManagementEditCancel: string;
    userPostManagementEditOK: string;
    userPostManagementPostTimeTitle: string;
    userPostManagementPostTimeOneWeek: string;
    userPostManagementPostTimeOneMonth: string;
    userPostManagementPostTimeAll: string;
    userPostManagementListPostEmpty: string;
  };

  // For Permission Management
  compPermissionManagement: {
    permissionTitle: string;
    permissionSearchHint: string;
    permissionSetPermission: string;
    permissionBlock: string;
    permissionConfirmTitle: string;
    permissionTypeConfirmPassword: string;
    permissionConfirmOk: string;
    permissionConfirmCancel: string;
    permissionUpdatePermission: string;
    permissionChoosePermission: string;
    permissionMessIncorrectData: string;
    permissionMessIncorrectPassword: string;
    permissionMessServerError: string;
    permissionMessUpdatedSuccess: string;
    permissionMessUpdatedFail: string;
    permissionUpdatePermissionTitle: string;
    perrmisionSendNotifyTitle: string;
    permissionSend: string;
    permissionEnterNotify: string;
    permissionBlockTitle: string;
    permissionBlockReason: string;
    permissionUnBlockTitle: string;
    // For block message
    blockPolicyViolation: string;
    blockAccountImpersonation: string;
    blockOffensiveBehavior: string;
  };

  // For add tour
  compAddTour: {
    addTourInfoTitle: string;
    addTourGuideInfoTitle: string;
    addTourSchedulesTitle: string;
    addTourPreparationTitle: string;
    addTourName: string;
    addTourEnterName: string;
    addTourPlace: string;
    addTourBeginTime: string;
    addTourEndTime: string;
    addTourEndFeedbackTime: string;
    addTourEndRegisterTime: string;
    addTourTime: string;
    addTourDays: string;
    addTourDesc: string;
    addTourEnterDesc: string;
    addTourProvince: string;
    addTourLocation: string;
    addTourEnterLocation: string;
    addTourNewLocation: string;
    addTourLocationName: string;
    addTourLocationProvince: string;
    addTourLocationGPS: string;
    addTourLocationAddress: string;
    addTourLocationImage: string;
    addTourNoteSelectMore: string;
    addTourAddSuccess: string;
    addTourAddFail: string;
    addTourCover: string;
    addTourAddSchedule: string;
    addTourInputAllBefore: string;
    addTourScheduleCost: string;
    addTourLimitMembers: string;
    addTourRegisterCost: string;
    addTourTourguide: string;
    addTourContact: string;
    addTourPeople: string;
    addTourItemPreparation: string;
    addTourAddPrepataion: string;
    addTourPerform: string;
    addTourDurationTime: string;
    addTourDay: string;
    addTourInputScheduleBefore: string;
    addTourInputPreparationBefore: string;
    addTourReviewer: string;
    addTourCreateTour: string;
    addTourAddError: string;
  };

  // Add Schedule
  compAddSchedule: {
    addScheduleDay: string;
    addSchedulePeriod: string;
    addScheduleKindof: string;
    addScheduleKindMoving: string;
    addScheduleKindEating: string;
    addScheduleKindVisiting: string;
    addScheduleKindRelaxing: string;
    addScheduleKindFreedom: string;
    addScheduleKindOthers: string;
    addSchedulePerform: string;
    addScheduleCost: string;
    addScheduleLocation: string;
    addScheduleNote: string;
    addScheduleAddTask: string;
    addScheduleAddPerform: string;
    addScheduleSelectOneBefore: string;
    addScheduleInvalidData: string;
    addScheduleNotes: string;
    addScheduleNoteSelectMore: string;
  };

  compAddPreparation: {
    addPreparationItemName: string;
    addPreparationAmount: string;
    addPreparationUnit: string;
    addPreparationPerforms: string;
    addPreparationToAll: string;
    addPreparationSelectPerform: string;
    addPreparationDeadline: string;
    addPreparationNotes: string;
    addPreparationGlassOf: string;
    addPreparationBowlOf: string;
    addPreparationSliceOf: string;
    addPreparationCartonOf: string;
    addPreparationPieceOf: string;
    addPreparationBagOf: string;
    addPreparationBarOf: string;
    addPreparationBottleOf: string;
    addPreparationRollOf: string;
  };

  compTourManagement: {
    screenTitle: string;
    tourName: string;
    tourGuide: string;
    creationTime: string;
    status: string;
    statusPending: string;
    statusRegistering: string;
    statusRunning: string;
    statusFinished: string;
    statusPreparing: string;
    statusPrepared: string;
    detailBtn: string;
    tourDetailModal: string;
    generalTab: string;
    scheduleTab: string;
    feedbackTab: string;
    membersTab: string;
    preparationTab: string;
    closeBtn: string;
    registerCost: string;
    tripDuration: string;
    tripDurationUnit: string;
    memberLimit: string;
    memberLimitUnit: string;
    available: string;
    contact: string;
    needToPay: string;
    prepared: string;
    deadline: string;
    note: string;
    from: string;
    to: string;
    location: string;
    task: string;
    joiningMember: string;
    scheduleCost: string;
    editBtn: string;
    saveBtn: string;
    tourguide: string;
    tourReopenModal: string;
    rename: string;
    beginTime: string;
    endTime: string;
    closeFeedbackTime: string;
    closeRegisterTime: string;
    reopenBtn: string;
    edit: string;
  };

  compUserTour: {
    screenTitle: string;
    tourName: string;
    departureTime: string;
    status: string;
    statusPending: string;
    statusRegistering: string;
    statusRunning: string;
    statusFinished: string;
    statusPreparing: string;
    statusPrepared: string;
    detailBtn: string;
    tripDuration: string;
    tripDurationUnit: string;
  };

  compUpdateProfile: {
    firstName: string;
    lastName: string;
    hometown: string;
    birthday: string;
    email: string;
    uploadAvatar: string;
    updateProfile: string;
    updateSuccess: string;
    updateFail: string;
  };

  compTourView: {
    tourNotPending: string;
    days: string;
    feedbackWillCloseOn: string;
    schedule: string;
    timeline: string;
    registerTime: string;
    feedbackTime: string;
    travelingTime: string;
    now: string;
    register: string;
    limitMembers: string;
    member: string;
    registerCost: string;
    VNDPerPerson: string;
    preparation: string;
    itemName: string;
    amount: string;
    allMembers: string;
    perform: string;
    specifiedPerformer: string;
    contact: string;
    tourguide: string;
    tourguideContact: string;
    relatedPost: string;
    expected: string;
  };

  compReviewerFeedback: {
    review: string;
    pending: string;
    approved: string;
    requestChange: string;
    denied: string;
    submitReview: string;
  };

  compTourOwnerControl: {
    complete: string;
    delete: string;
    edit: string;
    pending: string;
    approved: string;
    requestChange: string;
    denied: string;
    deleteQuestion: string;
    completeQuestion: string;
  };

  compTourRegistering: {
    perPerson: string;
    register: string;
    registerFor: string;
    person: string;
    relativesNote: string;
    total: string;
    slotAvailable: string;
    fullSlot: string;
    requiredRelativesInfo: string;
    contact: string;
    phoneNumber: string;
    registered: string;
    loginToRegister: string;
  };

  compTourEditing: {
    editTitle: string;
    summary: string;
    tourName: string;
    description: string;
    closeFeedbackTime: string;
    closeRegisterTime: string;
    beginTime: string;
    endTime: string;
    cover: string;
    locations: string;
    schedule: string;
    preparation: string;
    performs: string;
  };

  constructor() { }
}
