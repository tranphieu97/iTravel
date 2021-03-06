import { Language } from './language.model';

export const LangEnglish: Language = {
  // Common
  common: {
    ok: 'Ok',
    cancel: 'Cancel',
    thisFieldIsRequired: 'This field is required',
    enter: 'Enter ',
    next: 'Next page',
    prev: 'Previous page',
    from: 'From',
    to: 'To',
    choose: 'Choose ',
    invalidInputData: 'Input data is invalid',
    verifyAction: 'Verify action'
  },

  // Layout
  compLayout: {
    tooltipNewPost: 'New Post',
    tooltipPostManagement: 'Posts Management',
    tooltipUserManagement: 'Users Management',
    tooltipNewTour: 'New Tour',
    tooltipTourManagement: 'Tours Management'
  },

  // For Header Component
  compHeader: {
    headerVietnamese: 'Vietnamese',
    headerEnglish: 'English',
    headerHi: 'Hi, ',
    headerLogin: 'Login',
    headerRegister: 'Register',
    headerQuestionToLogin: 'Do you want to login?',
    headerSearch: 'Search',
    headerPersonalInfo: 'Personal Information',
    headerLogOut: 'Sign Out',
    headerUserContribution: 'Contribution',
    headerUserTour: 'Your tours',
    headerUpdateProfile: 'Update Profile'
  },

  // For Login
  compLogin: {
    loginTitle: 'SIGN IN',
    loginUsername: 'Username',
    loginPassword: 'Password',
    loginSignIn: 'Sign In',
    loginSignInWithGoogle: ' Sign in With ',
    loginNotRegister: 'Not Registered ',
    loginCreatAnAccount: 'Create An Account',
    loginErrorUsernameRequired: 'Username is required',
    loginErrorUsernameLength: 'An Username has 6 - 30 charaters',
    loginErrorUsernamePattern:
      'An Username just includes charaters a-z, number, _, @ and -',
    loginErrorPasswordRequired: 'Password is required',
    loginErrorPasswordLength: 'A Password has least 8 charaters',
    loginEnterUsername: 'Enter your Username',
    loginEnterPassword: 'Enter your Password'
  },

  // For Register Component
  compRegister: {
    registerTitle: 'REGISTER',
    registerFirstName: 'First Name',
    registerLastName: 'Last Name:',
    registerUsername: 'Choose a Username',
    registerPassword: 'Choose a Password',
    registerConfirmPassword: 'Confirm Password',
    // tslint:disable-next-line: quotemark
    registerAcceptPolicies: "I accept this website's policies",
    registerRegister: 'Register',
    registerBackToHome: 'Back to Home',
    registerBackToLogin: 'Back to Login',
    registerErrorFirstNameRequired: 'First name is required',
    registerErrorUsernameRequired: 'Username is required',
    registerErrorUsernameLength: 'An Username has 6 - 30 charaters',
    registerErrorUsernamePattern:
      'An Username just includes charaters a-z, number, _, @ and -',
    registerErrorPasswordRequired: 'Password is required',
    registerErrorPasswordLength: 'A Password has least 8 charaters',
    registerErrorPasswordPattern:
      'A Password need includes upper case charaters, lower case charaters, numbers',
    registerEnterFirstname: 'Enter your First name',
    registerEnterLastname: 'Enter your Last name',
    registerEnterUsername: 'Enter your Username',
    registerEnterPassword: 'Enter your Password',
    registerEnterConfirmPassword: 'Re-enter your Password',
    registerDataInvalid: 'Register Fail, Invalid Data',
    registerFail: 'Register Fail',
    registerSuccess: 'Register Success',
    registerUsernameExist: 'Username is exist, choose another',
    registerPasswordNotMatch: 'Password and re-password are not match'
  },

  // For Feedback Component
  compFeedback: {
    feedbackTitle: 'Feedback',
    feedbackName: 'Feedback Name ',
    feedbackKindOf: 'Kind of Feedback ',
    feedbackUsername: 'Username',
    feedbackAdditionalContact: 'Additional Contact',
    feedbackContent: 'Feedback Content ',
    feedbackAboutSystem: 'About System',
    feedbackAboutContent: 'About Content',
    feedbackAboutUser: 'About User',
    feedbackAboutPolicies: 'About Policies',
    feedbackAboutOthers: 'The Others',
    feedbackEnterName: 'Enter Feedback Name',
    feedbackEnterUsername: 'Enter Username',
    feedbackEnterAdditionalContact: 'Enter Additional Contact Information',
    feedbackEnterContent: 'Enter Feedback Content',
    feedbackSubmit: 'Submit',
    feedbackCancel: 'Go back',
    feedbackErrorNameRequired: 'Feedback name is required',
    feedbackErrorKindOfRequired: 'Choose kind of feedback is required',
    feedbackErrorContentRequired: 'Feedback content is required',
    feedbackSuccess: 'Feedback Success! Thanks for your feedback',
    feedbackFail: 'Feedback Fail! Please try again'
  },

  // For Menu in NavigationBar Component
  compNavigationBar: {
    menuHome: 'Home',
    // tslint:disable-next-line: quotemark
    menuVNRegions: "Vietnam's Regions",
    menuTravel: 'Travel',
    menuCuisine: 'Cuisine',
    menuPlans: 'Plans',
    menuTrend: 'Trend',
    menuFilter: 'Search',
    menuPersonal: 'Personal',
    menuAbout: 'About Us',
    menuItemTheNorth: 'The North',
    menuItemTheCentral: 'The Central',
    menuItemTheSouth: 'The South',
    menuItemHot: 'Hot',
    menuItemMostRecent: 'Most Recent',
    menuItemOneDay: '1 day',
    menuItemOneWeek: '2 - 7 days',
    menuItemMoreThanAWeek: 'More than 7 days',
    menuItemProfile: 'Personal Information',
    menuItemChangePassword: 'Change Password',
    menuItemContribution: 'Contribution',
    menuItemPolicies: 'Policies',
    menuItemFeedback: 'Feedback'
  },

  // For Notification
  compNotification: {
    notificationNeedLogin: 'Login to see messages',
    notificationNoMessage: 'No recent message'
  },

  // For Post Management
  compPostManagement: {
    postManagementTitle: 'Post Management',
    postManagementStartDate: 'From: ',
    postManagementEndDate: 'To: ',
    postManagementApproved: 'Approved',
    postManagementPending: 'Pending',
    postManagementDenied: 'Denied',
    postManagementAllPost: 'All Posts',
    postManagementErrorEmptyDate:
      'Empty start date or end date, enter them to filter',
    postManagementErrorInvalidDate: 'Invalid date format',
    postManagementErrorStartAfterEnd:
      'Start date need equal or earlier than end date',
    postManagementFilter: 'Filter',
    postManagementTablePostName: 'Title',
    postManagementTablePostAuthor: 'Author',
    postManagementTablePostCreationTime: 'Creation Time',
    postManagementTablePostCategories: 'Categories',
    postManagementTablePostStatus: 'Status',
    postManagementTableAction: 'Action',
    postManagementPostViewTitle: 'Review',
    postManagementPostViewOk: 'Ok',
    postManagementApprove: 'Approve',
    postManagementDeny: 'Deny',
    postManagementCancel: 'Cancel',
    postManagementPostApprovedBefore: 'This post was approved before',
    postManagementPostNotFound: 'Post not found',
    postManagementErrorChangeStatus:
      'Change post status has error, please try again',
    postManagementDenyTitle: 'Deny a post',
    postManagementDenyPostId: 'Post ID',
    postManagementDenyReason: 'Reason',
    postManagementErrorEmptyReason: 'Deny reason is required',
    postManagementErrorInvalidDenyData: 'Post information is not match',
    postManagementErrorPostDenied: 'Post was denied before'
  },

  pagePostView: { sendBtn: 'Send Comment' },

  compTourBuilding: {
    sendBtn: 'Send Feedback',
    notInFeedback: 'This Tour is not in feedback state'
  },

  // For Policies
  compPolicies: { policiesTitle: 'Using Policies' },

  // For Home Page
  pageHome: {
    homeIndexPostIn: 'Post in ',
    homeTourAvailable: 'Available Tours',
    homeTourBuilding: 'Tour Building',
    homeTourCloseFeedback: 'Close feedback in: '
  },

  // For Create Post
  compCreatePost: {
    createPostTitle: 'Title:',
    createPostTitlePlaceholder: 'Enter post title',
    createPostDescription: 'Description:',
    createPostDescriptionPlaceholder: 'Enter post description',
    createPostAddCoverBtn: 'Add Cover',
    createPostCategory: 'Category:',
    createPostTag: 'Tag:',
    createPostTagPlaceholder: 'Enter new tag',
    createPostAddTagBtn: 'Add',
    createPostPlace: 'Place:',
    createPostPlacePlaceholder: 'Enter place name',
    createPostAddress: 'Address:',
    createPostAddressPlaceholder: 'Enter address',
    createPostProvinceCity: 'Province City:',
    createPostFindProvinceCity: 'Find province city',
    createPostTopic: 'Post contents:',
    createPostTopicTitle: 'Title:',
    createPostTopicTitlePlaceholder: 'Enter paragraph title',
    createPostTopicContent: 'Content:',
    createPostTopicContentPlaceholder: 'Enter paragraph content',
    createPostTopicAddImgBtn: 'Add image',
    createPostTopicImgDescription: 'Enter image description',
    createPostSaveBtn: 'Save',
    createPostCancelBtn: 'Cancel',
    createPostInvalidTitleLength: 'Post title can not be too long!',
    createPostInvalidTitleEmpty: 'Post title can not be empty!',
    createPostInvalidDescLength: 'Post description can not be too long!',
    createPostInvalidDescEmpty: 'Post description can not be empty!',
    createPostInvalidCoverEmpty: 'Cover can not be empty!',
    createPostInvalidCategoryEmpty: 'Post category can not be empty!',
    createPostInvalidTagLength: 'Can not add too long tag!',
    createPostInvalidPlaceLength: 'Place can not be too long!',
    createPostInvalidPlaceEmpty: 'Place can not be empty!',
    createPostInvalidAddressLength: 'Address can not be too long!',
    createPostInvalidProvinceEmpty: 'Province-City can not be empty!',
    createPostInvalidTopicEmpty: 'Post content can not be empty!',
    createPostAlertSaveSuccess:
      'Your post was saved successfully, click to see.',
    // tslint:disable-next-line: quotemark
    createPostAlertSaveAlready: "Your post was saved, can't save any more!"
  },

  // For Region
  compFilterbyRegion: {
    regionTheNorth: 'The North',
    regionTheCentral: 'The Central',
    regionTheSouth: 'The South',
    regionPostRatio: 'Amount Posts Ratio'
  },

  // For Trend
  pageTrend: {
    trendSearchCharTitle: 'Search Trend',
    trendSearchChartDes: 'The most searched keyword: ',
    trendPostViewChartTitle: 'View Post Trend',
    trendTop10PostViewAmount: 'Top 10 of view amount post'
  },

  // For Travel and Cuisine Filter
  pageFilter: {
    filterTheMostAmountOfViewPost: 'Most view Post',
    filterTheMostAmountOfView: 'View Amount: ',
    filterFullTitle: 'Post Filter',
    filterFullCategory: 'Category',
    filterFullKeyword: 'Keyword',
    filterFullRegion: 'Region',
    filterFullFilter: 'Filter',
    posts: 'Posts',
    tours: 'Tours',
    enterSearch: 'Enter search content'
  },

  // For User Module
  compUserPostManagement: {
    userPostManagementTitle: 'Contribution Posts',
    userPostManagementApproved: 'Approved',
    userPostManagementPending: 'Pending',
    userPostManagementDenied: 'Denied',
    userPostManagementAllPost: 'All Post',
    // tslint:disable-next-line: quotemark
    userPostManagementEnterPostTitle: "Enter Post's title",
    userPostManagementTablePostName: 'Title',
    userPostManagementTablePostCreationTime: 'Creation Time',
    userPostManagementTablePostCategories: 'Categories',
    userPostManagementTablePostStatus: 'Status',
    userPostManagementTableAction: 'Action',
    userPostManagementEditTitle: 'Edit Post',
    userPostManagementEditMessage:
      // tslint:disable-next-line: quotemark
      "Edit Post's content will send it to pending list",
    userPostManagementEditCancel: 'Cancel',
    userPostManagementEditOK: 'Ok',
    userPostManagementPostTimeTitle: 'Creation Time ',
    userPostManagementPostTimeOneWeek: 'In a week',
    userPostManagementPostTimeOneMonth: 'In a month',
    userPostManagementPostTimeAll: 'All time',
    userPostManagementListPostEmpty: 'List Posts is empty'
  },

  // For Pessmission
  compPermissionManagement: {
    permissionTitle: 'Users Permission',
    permissionSearchHint: 'Type username',
    permissionSetPermission: 'Set User Permission',
    permissionBlock: 'Block Account',
    permissionConfirmTitle: 'Confirm change',
    permissionTypeConfirmPassword: 'Type your password',
    permissionConfirmOk: 'Ok',
    permissionConfirmCancel: 'Cancel',
    permissionUpdatePermission: 'Update Permission',
    permissionChoosePermission: 'Choose Permissions',
    permissionMessIncorrectData: 'Incorrect Update data',
    permissionMessIncorrectPassword: 'Incorrect Password',
    permissionMessServerError: 'System Error',
    permissionMessUpdatedSuccess: 'Updated Success!',
    permissionMessUpdatedFail: 'Updated Fail, Try again',
    permissionUpdatePermissionTitle: 'Update permision:',
    perrmisionSendNotifyTitle: 'Notify:',
    permissionSend: 'Send',
    permissionEnterNotify: 'Enter notification content',
    permissionBlockTitle: 'Block Account',
    permissionBlockReason: 'Block Reason',
    permissionUnBlockTitle: 'UnBlock Account',
    // For block message
    blockPolicyViolation: 'Violate website policies',
    blockAccountImpersonation: 'An Impersonation account',
    blockOffensiveBehavior: 'Comprise offensive behavior'
  },

  // For add tour
  compAddTour: {
    addTourInfoTitle: 'Tour Summary',
    addTourGuideInfoTitle: 'thay ghi ben model ma ben nay chua co',
    addTourSchedulesTitle: 'Schedules Details',
    addTourPreparationTitle: 'Preparation Details',
    addTourName: 'Tour name',
    addTourBeginTime: 'Begin Time',
    addTourDays: 'Total time',
    addTourPlace: 'Place',
    addTourEnterName: 'Enter tour name',
    addTourDesc: 'Description',
    addTourEnterDesc: 'Enter tour description',
    addTourEndTime: 'End Time',
    addTourEndFeedbackTime: 'Feedback Deadline',
    addTourEndRegisterTime: 'Register Deadline',
    addTourTime: 'Time',
    addTourProvince: 'Province City',
    addTourLocation: 'Locations',
    addTourEnterLocation: 'Enter Location Name',
    addTourNewLocation: 'New Location',
    addTourLocationName: 'Location Name',
    addTourLocationProvince: 'Province',
    addTourLocationGPS: 'GPS',
    addTourLocationAddress: 'Address',
    addTourLocationImage: 'Image',
    addTourNoteSelectMore: 'This property is able to select more options',
    addTourAddSuccess: 'Add Success!',
    addTourAddFail: 'Add Fail, Please try again!',
    addTourCover: 'Cover',
    addTourAddSchedule: 'Add Schedule',
    addTourInputAllBefore: 'Please input all field before',
    addTourScheduleCost: 'Schedule Cost: ',
    addTourLimitMembers: 'Limit of members',
    addTourRegisterCost: 'Register Cost',
    addTourTourguide: 'Tourguide',
    addTourContact: 'Contact',
    addTourPeople: 'people',
    addTourItemPreparation: 'Items Preparation',
    addTourAddPrepataion: 'Add Item',
    addTourPerform: 'Performs',
    addTourDurationTime: 'Tour\' Duration Time',
    addTourDay: 'days',
    addTourInputPreparationBefore: 'Plese input preparation informations',
    addTourInputScheduleBefore: 'Please input schedule details',
    addTourReviewer: 'Reviewer',
    addTourCreateTour: 'Create New Tour',
    addTourAddError: 'Unknow create tour error, try again!'
  },

  // Add Schedule
  compAddSchedule: {
    addScheduleDay: 'Day',
    addSchedulePeriod: 'Period',
    addScheduleKindof: 'Kind of task',
    addScheduleKindMoving: 'Moving',
    addScheduleKindEating: 'Eating',
    addScheduleKindVisiting: 'Visiting',
    addScheduleKindRelaxing: 'Relaxing',
    addScheduleKindFreedom: 'Freedom',
    addScheduleKindOthers: 'The others',
    addSchedulePerform: 'Perform',
    addScheduleCost: 'Cost',
    addScheduleLocation: 'Location',
    addScheduleNote: 'Notes',
    addScheduleAddTask: 'Add another task',
    addScheduleAddPerform: 'Add another perfrom',
    addScheduleSelectOneBefore: 'Current select has not been finished',
    addScheduleInvalidData: 'Invalid Data, please try again',
    addScheduleNotes: 'Notes',
    addScheduleNoteSelectMore: 'This option is be able to select more'
  },

  compAddPreparation: {
    addPreparationItemName: 'Item name',
    addPreparationAmount: 'Amount',
    addPreparationUnit: 'Unit',
    addPreparationPerforms: 'Performs',
    addPreparationToAll: 'All Members',
    addPreparationSelectPerform: 'Select performs',
    addPreparationDeadline: 'Deadline',
    addPreparationNotes: 'Notes',
    addPreparationGlassOf: 'Glass',
    addPreparationBowlOf: 'Bowl',
    addPreparationSliceOf: 'Slice',
    addPreparationCartonOf: 'Carton',
    addPreparationPieceOf: 'Piece',
    addPreparationBagOf: 'Bag',
    addPreparationBarOf: 'Bar',
    addPreparationBottleOf: 'Bottle',
    addPreparationRollOf: 'Roll'
  },

  compTourManagement: {
    screenTitle: 'Tour Managememt',
    tourName: 'Tourname',
    tourGuide: 'Tour guide',
    creationTime: 'Creation time',
    status: 'Status',
    statusPending: 'PENDING',
    statusRegistering: 'REGISTERING',
    statusRunning: 'RUNNING',
    statusFinished: 'FINISHED',
    statusPreparing: 'PREPARING',
    statusPrepared: 'FINISHED',
    detailBtn: 'Detail',
    tourDetailModal: 'Tour Detail',
    generalTab: 'General',
    scheduleTab: 'Schedule',
    feedbackTab: 'Feedback',
    membersTab: 'Members',
    preparationTab: 'Preparation',
    closeBtn: 'Close',
    registerCost: 'Cost',
    tripDuration: 'Trip duration',
    tripDurationUnit: 'day(s)',
    memberLimit: 'Member limit',
    memberLimitUnit: 'people',
    available: 'Available',
    contact: 'Contact',
    needToPay: 'Need to pay',
    prepared: 'Prepared',
    deadline: 'Deadline',
    note: 'Note',
    from: 'From',
    to: 'To',
    location: 'Location',
    task: 'Task',
    joiningMember: 'Joining',
    scheduleCost: 'Cost',
    editBtn: 'Edit',
    saveBtn: 'Save',
    tourguide: 'Tourguide',
    tourReopenModal: 'Reopen Tour',
    beginTime: 'Start at',
    endTime: 'Finish at',
    closeFeedbackTime: 'Receive feedback until',
    closeRegisterTime: 'Register until',
    rename: 'rename',
    reopenBtn: 'Reopen',
    edit: 'Edit',
    collectedMoney: 'Paid',
    verifyCollectedMoney: 'Verify paid',
    registerFor: 'Register for (people)'
  },

  compUserTour: {
    screenTitle: 'Your tours',
    tourName: 'Tourname',
    departureTime: 'Departure time',
    status: 'Status',
    statusPending: 'PENDING',
    statusRegistering: 'REGISTERING',
    statusRunning: 'RUNNING',
    statusFinished: 'FINISHED',
    statusPreparing: 'PREPARING',
    statusPrepared: 'FINISHED',
    detailBtn: 'Detail',
    tripDuration: 'Trip duration',
    tripDurationUnit: 'day(s)',
    cancelTourBtn: 'Cancel tour',
    confirmCancelTour: 'You really want to cancel this tour?'
  },

  compUpdateProfile: {
    birthday: 'Birthday',
    email: 'Email',
    firstName: 'First name',
    lastName: 'Last name',
    hometown: 'Hometown',
    updateFail: 'Update Fail, try again!',
    updateProfile: 'Update Profile',
    updateSuccess: 'Update Success!',
    uploadAvatar: 'Upload Avatar'
  },

  compTourView: {
    tourNotPending: 'This tour is not in building state',
    days: 'days',
    feedbackWillCloseOn: 'Feedback will close on: ',
    schedule: 'Schedule',
    timeline: 'Timeline',
    registerTime: 'Register Time',
    feedbackTime: 'Feedback Time',
    travelingTime: 'Traveling Time',
    now: 'Now',
    register: 'Registering',
    limitMembers: 'Limit of Members',
    member: ' members',
    registerCost: 'Register Cost',
    VNDPerPerson: 'VND/person',
    preparation: 'Preparation',
    itemName: 'Item Name',
    allMembers: 'All Member',
    amount: 'Amount',
    perform: 'Perform',
    specifiedPerformer: 'Specified Performer',
    contact: 'Contact',
    tourguide: 'Tourguide',
    tourguideContact: 'Contact',
    relatedPost: 'Related Posts',
    expected: 'Expected'
  },

  compReviewerFeedback: {
    review: 'Review',
    approved: 'Approve',
    denied: 'Deny',
    pending: 'Pending',
    requestChange: 'Request Change',
    submitReview: 'Submit Review'
  },

  compTourOwnerControl: {
    complete: 'Complete',
    delete: 'Delete',
    edit: 'Go to Edit',
    pending: 'Pending',
    approved: 'Approved',
    requestChange: 'Requested Change',
    denied: 'Denied',
    deleteQuestion: 'Are you sure? This action can not been restore',
    completeQuestion: 'Are you sure? This tour can not reviced feedback after'
  },

  compTourRegistering: {
    perPerson: 'VND/person',
    register: 'Register',
    registerFor: 'Register for',
    person: 'person',
    relativesNote: 'Relatives Note',
    total: 'Total',
    slotAvailable: 'slots available',
    fullSlot: 'Full slot, See you in the next tour!',
    requiredRelativesInfo: 'How many children, teenager, old person in your register?',
    contact: 'Contact',
    phoneNumber: 'Phone number',
    registered: 'Registered',
    loginToRegister: 'Login to Register',
    errorRegisterMoreThanLimit: 'Your register more than tour available slots now',
    errorRegisterFail: 'Register Fail, try again!'
  },

  compTourEditing: {
    editTitle: 'Edit Tour',
    summary: 'Summary',
    tourName: 'Tour Name',
    description: 'Description',
    closeFeedbackTime: 'Close Feedback Time',
    closeRegisterTime: 'Close Register Time',
    beginTime: 'Begin Time',
    endTime: 'End Time',
    cover: 'Cover',
    locations: 'Locations',
    schedule: 'Schedule',
    preparation: 'Preparation',
    performs: 'Performs',
    province: 'Province/City',
    selectedLocation: 'Selected Location',
    newLocation: 'New Location',
    provinceLocation: 'Province\'s Locations',
    addSchedule: 'Add Schedule',
    scheduleCost: 'Schedule Cost: ',
    memberLimit: 'Member limit',
    registerCost: 'Register cost',
    perPerson: 'VND/Person',
    timeline: 'Timeline',
    register: 'Register',
    tourguide: 'Tourguide',
    tourguideContact: 'Tourguide \'s Contact',
    addPreparation: 'Add preparation',
    addPreformer: 'Add Performers',
    currentPerformer: 'Current Performers',
    members: 'Tour\'s members',
    tourguides: 'Tourguides',
    editTourMessage: 'Are your sure? This action cannot restore in the future.',
    cancelEditMessage: 'Are your sure? Your change is not saved now',
    editTourFail: 'Edit fail, try again!',
    editTourSuccess: 'Edit success!'
  }
};
