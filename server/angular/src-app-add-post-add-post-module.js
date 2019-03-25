(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["src-app-add-post-add-post-module"],{

/***/ "./src/app/add-post/add-post.module.ts":
/*!*********************************************!*\
  !*** ./src/app/add-post/add-post.module.ts ***!
  \*********************************************/
/*! exports provided: AddPostModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPostModule", function() { return AddPostModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _add_post_routing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-post.routing */ "./src/app/add-post/add-post.routing.ts");
/* harmony import */ var _create_post_create_post_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-post/create-post.component */ "./src/app/add-post/create-post/create-post.component.ts");
/* harmony import */ var _create_post_create_tag_create_tag_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./create-post/create-tag/create-tag.component */ "./src/app/add-post/create-post/create-tag/create-tag.component.ts");
/* harmony import */ var _create_post_create_post_content_create_post_content_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-post/create-post-content/create-post-content.component */ "./src/app/add-post/create-post/create-post-content/create-post-content.component.ts");
/* harmony import */ var _create_post_create_location_create_location_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./create-post/create-location/create-location.component */ "./src/app/add-post/create-post/create-location/create-location.component.ts");
/* harmony import */ var _create_post_create_category_create_category_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create-post/create-category/create-category.component */ "./src/app/add-post/create-post/create-category/create-category.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AddPostModule = /** @class */ (function () {
    function AddPostModule() {
    }
    AddPostModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _add_post_routing__WEBPACK_IMPORTED_MODULE_3__["AddPostRoutingModule"]
            ],
            exports: [],
            declarations: [_create_post_create_post_component__WEBPACK_IMPORTED_MODULE_4__["CreatePostComponent"],
                _create_post_create_tag_create_tag_component__WEBPACK_IMPORTED_MODULE_5__["CreateTagComponent"], _create_post_create_post_content_create_post_content_component__WEBPACK_IMPORTED_MODULE_6__["CreatePostContentComponent"], _create_post_create_location_create_location_component__WEBPACK_IMPORTED_MODULE_7__["CreateLocationComponent"], _create_post_create_category_create_category_component__WEBPACK_IMPORTED_MODULE_8__["CreateCategoryComponent"]]
        })
    ], AddPostModule);
    return AddPostModule;
}());



/***/ }),

/***/ "./src/app/add-post/add-post.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/add-post/add-post.routing.ts ***!
  \**********************************************/
/*! exports provided: AddPostRoutingModule, routedComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPostRoutingModule", function() { return AddPostRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routedComponents", function() { return routedComponents; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _create_post_create_post_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-post/create-post.component */ "./src/app/add-post/create-post/create-post.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: _create_post_create_post_component__WEBPACK_IMPORTED_MODULE_2__["CreatePostComponent"] },
    { path: ':id', component: _create_post_create_post_component__WEBPACK_IMPORTED_MODULE_2__["CreatePostComponent"] },
    { path: '**', redirectTo: '/not-found' }
];
var AddPostRoutingModule = /** @class */ (function () {
    function AddPostRoutingModule() {
    }
    AddPostRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], AddPostRoutingModule);
    return AddPostRoutingModule;
}());

var routedComponents = [_create_post_create_post_component__WEBPACK_IMPORTED_MODULE_2__["CreatePostComponent"]];


/***/ }),

/***/ "./src/app/add-post/create-post/create-category/create-category.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-category/create-category.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-0\">\r\n    <div class=\"col-12 p-0\">\r\n        <!-- row1 has label, dropdown and button Add -->\r\n        <div class=\"row\">\r\n            <div class=\"col-xl-2 col-md-3\">\r\n                <label>{{ compLanguage.createPostCategory }}</label>\r\n            </div>\r\n            <div class=\"col-xl-10 col-md-9\">\r\n                <select class=\"form-control\" #selectCate (change)=\"onSelectCategory($event)\" (click)=\"onClickSelect(selectCate)\">\r\n                <!-- <select class=\"form-control\"> -->\r\n                    <option [value]=\"postCategory.name\" *ngFor=\"let postCategory of allCategories\">{{\r\n                        postCategory.name }}</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <!-- row2 has list all postCategories added, each category can delete by a X button on top-right -->\r\n        <div class=\"row d-block\">\r\n            <div class=\"col-12\">\r\n                <div class=\"tag\" *ngFor=\"let category of post.categories\">\r\n                    {{ category.name }}<span class=\"fas fa-times-circle remove-btn\" (click)=\"onRemoveCategory(category, selectCate)\"></span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/add-post/create-post/create-category/create-category.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-category/create-category.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "select {\n  width: 100%;\n  font-size: 17px;\n  height: auto; }\n  select option {\n    font-size: 17px; }\n  label {\n  font-size: 17px;\n  font-weight: bold; }\n  .tag {\n  font-size: 14px;\n  font-weight: bold;\n  margin-top: 15px;\n  margin-right: 15px;\n  padding: 10px;\n  border-color: transparent;\n  border-radius: 0.5rem;\n  background-color: lightgray;\n  overflow: visible;\n  position: relative;\n  display: inline-block;\n  cursor: default; }\n  .remove-btn {\n  font-size: 14px;\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/add-post/create-post/create-category/create-category.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-category/create-category.component.ts ***!
  \***********************************************************************************/
/*! exports provided: CreateCategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateCategoryComponent", function() { return CreateCategoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_core_services_post_category_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/post-category.service */ "./src/app/core/services/post-category.service.ts");
/* harmony import */ var src_app_model_post_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/model/post.model */ "./src/app/model/post.model.ts");
/* harmony import */ var src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/post.service */ "./src/app/core/services/post.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateCategoryComponent = /** @class */ (function () {
    function CreateCategoryComponent(postCategoryService, postService) {
        this.postCategoryService = postCategoryService;
        this.postService = postService;
        this.allCategories = [];
    }
    CreateCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.postCategoryService.newCategoriesUpdated.asObservable()
            .subscribe(function () {
            // update allCategories same as data on service
            _this.allCategories = _this.postCategoryService.allCategories;
        });
        this.postCategoryService.getAllCategories();
    };
    // this event happen before user choose new category to reset select value
    CreateCategoryComponent.prototype.onClickSelect = function (selectCate) {
        selectCate.value = '';
    };
    CreateCategoryComponent.prototype.onSelectCategory = function (event) {
        // get selectedCategory
        var selectedCategory = event.target.value;
        // check if post has selectedCategory or not
        var duplicateCategory = this.post.categories.find(function (eachEle) {
            return eachEle.name === selectedCategory;
        });
        if (duplicateCategory === undefined || duplicateCategory === null) {
            // if not yet, create newCategory from allCategories
            var newCategory = this.allCategories.find(function (eachEleInALL) {
                return eachEleInALL.name.toLowerCase() === selectedCategory.toLowerCase();
            });
            if (newCategory !== null && newCategory !== undefined) {
                // push that newCategory to post.categories
                this.post.categories.push(newCategory);
            }
            else {
                // user choose a category that not exist => hacker
            }
        }
        // emit event
        this.postService.categoryChanged.next();
    };
    CreateCategoryComponent.prototype.onRemoveCategory = function (removedCategory, selectEle) {
        // filt out the removedCategory
        this.post.categories = this.post.categories.filter(function (eachEle) {
            return eachEle.name !== removedCategory.name;
        });
        // emit event
        this.postService.categoryChanged.next();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", src_app_model_post_model__WEBPACK_IMPORTED_MODULE_2__["Post"])
    ], CreateCategoryComponent.prototype, "post", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CreateCategoryComponent.prototype, "compLanguage", void 0);
    CreateCategoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-category',
            template: __webpack_require__(/*! ./create-category.component.html */ "./src/app/add-post/create-post/create-category/create-category.component.html"),
            styles: [__webpack_require__(/*! ./create-category.component.scss */ "./src/app/add-post/create-post/create-category/create-category.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_core_services_post_category_service__WEBPACK_IMPORTED_MODULE_1__["PostCategoryService"], src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_3__["PostService"]])
    ], CreateCategoryComponent);
    return CreateCategoryComponent;
}());



/***/ }),

/***/ "./src/app/add-post/create-post/create-location/create-location.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-location/create-location.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- row1 has location name -->\r\n<div class=\"row\">\r\n  <div class=\"col-xl-2 col-md-3 col-12\">\r\n    <label>{{ compLanguage.createPostPlace }}</label>\r\n  </div>\r\n  <div class=\"col-xl-10 col-md-9 col-12\">\r\n    <!-- <input type=\"text\" name=\"place\" class=\"form-control\" placeholder=\"Nha Trang beach\"> -->\r\n    <input type=\"text\" name=\"place\" class=\"form-control\" [placeholder]=\"compLanguage.createPostPlacePlaceholder\"\r\n      [value]=\"post.location.locationName\" (blur)=\"onUpdatePlace($event)\" maxlength=\"200\">\r\n  </div>\r\n</div>\r\n<br>\r\n<!-- row2 has location address -->\r\n<div class=\"row\">\r\n  <div class=\"col-xl-2 col-md-3 col-12\">\r\n    <label>{{ compLanguage.createPostAddress }}</label>\r\n  </div>\r\n  <div class=\"col-xl-10 col-md-9 col-12\">\r\n    <!-- <input type=\"text\" name=\"address\" class=\"form-control\" placeholder=\"No.1 Vo Van Ngan\"> -->\r\n    <input type=\"text\" name=\"address\" class=\"form-control\" [placeholder]=\"compLanguage.createPostAddressPlaceholder\"\r\n      [value]=\"post.location.address\" (blur)=\"onUpdateAddress($event)\" maxlength=\"300\">\r\n  </div>\r\n</div>\r\n<br>\r\n<!-- row3 has select box for province -->\r\n<div class=\"row\">\r\n  <!-- col1 has label -->\r\n  <div class=\"col-xl-2 col-md-3 col-12\">\r\n    <label>{{ compLanguage.createPostProvinceCity }}</label>\r\n  </div>\r\n  <!-- col3 has selectList as multiple -->\r\n  <div class=\"col-xl-4 col-md-9 col-12 margin-bottom-15\">\r\n    <!-- <input type=\"text\" name=\"province\" class=\"form-control\" [placeholder]=\"compLanguage.createPostFindProvinceCity\"> -->\r\n    <select class=\"form-control\" multiple>\r\n      <!-- ngFor here -->\r\n      <option *ngFor=\"let province of allProvCity\" [value]=\"province.provinceName\" (click)=\"onSelectProvince(province.provinceName)\">{{\r\n        province.provinceName }}</option>\r\n    </select>\r\n  </div>\r\n  <!-- col4 has result of multiple selectList -->\r\n  <div class=\"col-xl-6 col-md-12 col-12\">\r\n    <!-- ngFor here -->\r\n    <div class=\"tag\" *ngFor=\"let province of post.location.provinceCity\">\r\n      {{ province }}<span class=\"fas fa-times-circle esc-btn\" (click)=\"onRemoveProvince(province)\"></span>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/add-post/create-post/create-location/create-location.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-location/create-location.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "label {\n  font-size: 17px;\n  font-weight: bold; }\n\ninput {\n  font-size: 17px;\n  height: auto; }\n\n.fixed-height {\n  height: -webkit-fit-content;\n  height: -moz-fit-content;\n  height: fit-content; }\n\nselect {\n  height: 140px !important; }\n\nselect option {\n    font-size: 17px; }\n\n.margin-bottom-15 {\n  margin-bottom: 15px; }\n\n.tag {\n  font-size: 14px;\n  font-weight: bold;\n  margin-right: 15px;\n  margin-bottom: 15px;\n  padding: 10px;\n  border-color: transparent;\n  border-radius: 0.5rem;\n  background-color: lightgray;\n  cursor: default;\n  overflow: visible;\n  position: relative;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n  display: inline-block; }\n\n.esc-btn {\n  font-size: 14px;\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  cursor: pointer; }\n"

/***/ }),

/***/ "./src/app/add-post/create-post/create-location/create-location.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-location/create-location.component.ts ***!
  \***********************************************************************************/
/*! exports provided: CreateLocationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateLocationComponent", function() { return CreateLocationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_core_services_province_city_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/province-city.service */ "./src/app/core/services/province-city.service.ts");
/* harmony import */ var src_app_core_services_server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/server.service */ "./src/app/core/services/server.service.ts");
/* harmony import */ var src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/model/post.model */ "./src/app/model/post.model.ts");
/* harmony import */ var src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/post.service */ "./src/app/core/services/post.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreateLocationComponent = /** @class */ (function () {
    function CreateLocationComponent(provCityService, postService, serverService) {
        this.provCityService = provCityService;
        this.postService = postService;
        this.serverService = serverService;
        this.allProvCity = [];
        this.allLocations = [];
    }
    CreateLocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // call service to get all province - city
        // if all province are already exist in provCityService, dont need to call server
        if (this.provCityService.allProvinceCity.length > 0) {
            this.allProvCity = this.provCityService.allProvinceCity;
        }
        else {
            // if all province are not already exist in provCityService, get all from server and store to service
            this.provCityService.getAllProvinceCity()
                .subscribe(function (resData) {
                if (resData.data) {
                    _this.provCityService.allProvinceCity = resData.data.sort(function (provinceA, provinceB) {
                        if (provinceA.provinceName > provinceB.provinceName) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    });
                    _this.allProvCity = _this.provCityService.allProvinceCity;
                }
                // else err handling
            });
        }
        // call server service to get all location bacause we dont have location-service
        this.serverService.getListLocations().subscribe(function (resData) {
            _this.allLocations = resData.data;
        });
    };
    CreateLocationComponent.prototype.onRemoveProvince = function (removedProvince) {
        // console.log(removedCategory);
        this.post.location.provinceCity = this.post.location.provinceCity.filter(function (eachEle) {
            return eachEle !== removedProvince;
            // return eachEle._id !== removedCategory._id;
        });
        // emit event
        this.postService.provinceCityChanged.next();
    };
    CreateLocationComponent.prototype.onSelectProvince = function (selectedProvince) {
        // check if selected province is valid, if invalid => fake province => hacker
        var realProvince = this.provCityService.allProvinceCity.find(function (eachEle) {
            return eachEle.provinceName === selectedProvince;
        });
        if (realProvince !== null && realProvince !== undefined) {
            // check list province if selected province is a new province
            var duplicateProvince = this.post.location.provinceCity.find(function (eachEle) {
                return eachEle === selectedProvince;
            });
            // if is a new province => add the new
            if (duplicateProvince === null || duplicateProvince === undefined) {
                this.post.location.provinceCity.push(selectedProvince);
            }
        }
        // emit event
        this.postService.provinceCityChanged.next();
    };
    CreateLocationComponent.prototype.onUpdatePlace = function (event) {
        // validate here
        this.post.location.locationName = event.target.value;
        // emit event
        this.postService.placeChanged.next();
    };
    CreateLocationComponent.prototype.onUpdateAddress = function (event) {
        // validate here
        this.post.location.address = event.target.value;
        // emit event
        this.postService.addressChanged.next();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__["Post"])
    ], CreateLocationComponent.prototype, "post", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CreateLocationComponent.prototype, "compLanguage", void 0);
    CreateLocationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-location',
            template: __webpack_require__(/*! ./create-location.component.html */ "./src/app/add-post/create-post/create-location/create-location.component.html"),
            styles: [__webpack_require__(/*! ./create-location.component.scss */ "./src/app/add-post/create-post/create-location/create-location.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_core_services_province_city_service__WEBPACK_IMPORTED_MODULE_1__["ProvinceCityService"], src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_4__["PostService"], src_app_core_services_server_service__WEBPACK_IMPORTED_MODULE_2__["ServerService"]])
    ], CreateLocationComponent);
    return CreateLocationComponent;
}());



/***/ }),

/***/ "./src/app/add-post/create-post/create-post-content/create-post-content.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-post-content/create-post-content.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- big row include all post content component-->\r\n<div class=\"row\">\r\n  <div class=\"col-12\">\r\n    <!-- title for part post content -->\r\n    <div class=\"row\">\r\n      <div class=\"col-12 p-0\">\r\n        <h3 class=\"bigger\">{{ compLanguage.createPostTopic }}</h3>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- list all post-content and button add more post-content -->\r\n    <div class=\"row\">\r\n      <div class=\"col-12\">\r\n\r\n        <!-- ngfor here, each col-12 is a row and is a post-content -->\r\n        <div class=\"row myborder\" *ngFor=\"let postContent of post.postContents\">\r\n          <div class=\"col-12\">\r\n            <!-- input title -->\r\n            <br>\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-md-3 col-12 d-sm-block d-none\">\r\n                <label>{{ compLanguage.createPostTopicTitle }}</label>\r\n              </div>\r\n              <div class=\"col-xl-10 col-md-9 col-12\">\r\n                <input type=\"text\" class=\"form-control\" [placeholder]=\"compLanguage.createPostTopicTitlePlaceholder\"\r\n                  [value]=\"postContent.title\" (blur)=\"onUpdateTopicTitle(postContent, $event)\" maxlength=\"500\">\r\n              </div>\r\n            </div>\r\n\r\n            <!-- input content -->\r\n            <br>\r\n            <div class=\"row\">\r\n              <div class=\"col-xl-2 col-md-3 col-12 d-sm-block d-none\">\r\n                <label>{{ compLanguage.createPostTopicContent }}</label>\r\n              </div>\r\n              <div class=\"col-xl-10 col-md-9 col-12\">\r\n                <textarea rows=\"2\" class=\"form-control\" [placeholder]=\"compLanguage.createPostTopicContentPlaceholder\"\r\n                  [value]=\"postContent.content\" (blur)=\"onUpdateTopicContent(postContent, $event)\" maxlength=\"3000\"></textarea>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- add image for content -->\r\n            <br>\r\n            <div class=\"row\">\r\n              <div class=\"col-sm-5 col-12\">\r\n                <button class=\"btn btn-success bold\" (click)=\"filePicker.click()\">{{\r\n                  compLanguage.createPostTopicAddImgBtn }}</button>\r\n                <input class=\"d-none\" type=\"file\" #filePicker (change)=\"onImagePicked($event, postContent)\">\r\n              </div>\r\n              <div class=\"col-sm-7 col-12\">\r\n                <!-- image preview here -->\r\n                <div class=\"row\" *ngIf=\"postContent.image.length > 0\">\r\n                  <div class=\"col-12\">\r\n                    <img [src]=\"postContent.image\" [alt]=\"postContent.imageDesc\">\r\n                    <span class=\"fas fa-times-circle del-img-btn\" (click)=\"onDelImageClick(postContent)\"></span>\r\n                  </div>\r\n                </div>\r\n                <br>\r\n                <!-- image description here -->\r\n                <div class=\"row\" *ngIf=\"postContent.image.length > 0\">\r\n                  <div class=\"col-12\">\r\n                    <input type=\"text\" class=\"form-control description\" [placeholder]=\"compLanguage.createPostTopicImgDescription\"\r\n                      [value]=\"postContent.imageDesc\" (blur)=\"onUpdateImgDesc(postContent, $event)\" maxlength=\"200\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <!-- button for delete topic-content -->\r\n            <span class=\"fas fa-times-circle del-content-btn\" (click)=\"onRemovePostContent(postContent)\"></span>\r\n          </div>\r\n        </div>\r\n        <!-- last row has '+' button -->\r\n        <div class=\"row\">\r\n          <div class=\"col-12 no-padding\">\r\n            <button type=\"button\" class=\"btn btn-success right\" (click)=\"onAddPostContent()\"><span class=\"fas fa-plus\"></span></button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/add-post/create-post/create-post-content/create-post-content.component.scss":
/*!*********************************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-post-content/create-post-content.component.scss ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bigger {\n  font-size: 17px;\n  font-weight: bold; }\n\nlabel {\n  font-size: 14px;\n  font-weight: bold; }\n\ninput {\n  font-size: 14px; }\n\ntextarea {\n  font-size: 14px; }\n\nimg {\n  width: 100%;\n  height: auto;\n  border-radius: 0.25rem; }\n\n.myborder {\n  border: 2px solid black;\n  border-radius: 0.25rem;\n  margin-bottom: 10px; }\n\n.bold {\n  font-size: 14px;\n  font-weight: bold;\n  margin-bottom: 15px; }\n\n.description {\n  font-style: italic;\n  text-align: center; }\n\n.right {\n  width: 100%; }\n\n.right span {\n    font-size: 40px;\n    font-weight: bold; }\n\n.no-padding {\n  padding: 0px; }\n\n.del-img-btn {\n  cursor: pointer;\n  font-size: 14px;\n  position: absolute;\n  top: -8px;\n  right: 5px; }\n\n.del-content-btn {\n  cursor: pointer;\n  font-size: 14px;\n  position: absolute;\n  top: 2px;\n  right: 2px; }\n"

/***/ }),

/***/ "./src/app/add-post/create-post/create-post-content/create-post-content.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-post-content/create-post-content.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: CreatePostContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePostContentComponent", function() { return CreatePostContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_model_postContent_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/model/postContent.model */ "./src/app/model/postContent.model.ts");
/* harmony import */ var src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/post.service */ "./src/app/core/services/post.service.ts");
/* harmony import */ var src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/model/post.model */ "./src/app/model/post.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreatePostContentComponent = /** @class */ (function () {
    function CreatePostContentComponent(postService) {
        this.postService = postService;
    }
    CreatePostContentComponent.prototype.ngOnInit = function () {
    };
    CreatePostContentComponent.prototype.onImagePicked = function (event, addedImgPostContent) {
        if (addedImgPostContent !== null && addedImgPostContent !== undefined) {
            var file = event.target.files[0];
            // config reader to read file and show preview
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                addedImgPostContent.image = reader_1.result.toString();
            };
            reader_1.readAsDataURL(file);
            // emit file and id of postContent to store temporarily on createPostComponent
            this.postService.hasNewImage.next({ imgFile: file, contentId: addedImgPostContent._id });
        }
        // reset the <input> file for the next time
        event.target.value = '';
    };
    CreatePostContentComponent.prototype.onDelImageClick = function (removedImgPostContent) {
        // delete image url
        removedImgPostContent.image = '';
        // emit event hasImgDeleted
        this.postService.hasImgDeleted.next(removedImgPostContent._id);
    };
    CreatePostContentComponent.prototype.onRemovePostContent = function (removedPostContent) {
        // filt out the removed postContent
        this.post.postContents = this.post.postContents.filter(function (eachEle) {
            return eachEle._id !== removedPostContent._id;
        });
        // emit event hasImgDeleted
        this.postService.hasImgDeleted.next(removedPostContent._id);
        // emit event postContentChanged
        this.postService.postContentChanged.next();
    };
    CreatePostContentComponent.prototype.onAddPostContent = function () {
        // create temp PostContent with fake Id
        var tempPostContent = new src_app_model_postContent_model__WEBPACK_IMPORTED_MODULE_1__["PostContent"]('', '', '', '');
        // fake Id
        tempPostContent._id = new Date().toUTCString();
        this.post.postContents.push(tempPostContent);
        // emit event postContentChanged
        this.postService.postContentChanged.next();
    };
    CreatePostContentComponent.prototype.onUpdateTopicTitle = function (updatedPostContent, event) {
        var needUpdatedPostContent = this.post.postContents.find(function (eachEle) {
            return eachEle._id === updatedPostContent._id;
        });
        // validate here
        needUpdatedPostContent.title = event.target.value;
    };
    CreatePostContentComponent.prototype.onUpdateTopicContent = function (updatedPostContent, event) {
        var needUpdatedPostContent = this.post.postContents.find(function (eachEle) {
            return eachEle._id === updatedPostContent._id;
        });
        // validate here
        needUpdatedPostContent.content = event.target.value;
    };
    CreatePostContentComponent.prototype.onUpdateImgDesc = function (updatedPostContent, event) {
        var needUpdatedPostContent = this.post.postContents.find(function (eachEle) {
            return eachEle._id === updatedPostContent._id;
        });
        // validate here
        needUpdatedPostContent.imageDesc = event.target.value;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__["Post"])
    ], CreatePostContentComponent.prototype, "post", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CreatePostContentComponent.prototype, "compLanguage", void 0);
    CreatePostContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-post-content',
            template: __webpack_require__(/*! ./create-post-content.component.html */ "./src/app/add-post/create-post/create-post-content/create-post-content.component.html"),
            styles: [__webpack_require__(/*! ./create-post-content.component.scss */ "./src/app/add-post/create-post/create-post-content/create-post-content.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_2__["PostService"]])
    ], CreatePostContentComponent);
    return CreatePostContentComponent;
}());



/***/ }),

/***/ "./src/app/add-post/create-post/create-post.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/add-post/create-post/create-post.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-0 p-3 comp\">\r\n  <div class=\"col-md-7 p-2 content\">\r\n    <div class=\"row m-0 p-0 hidden-scroll\">\r\n      <div class=\"col-12 p-0 max-height\">\r\n        <!-- on top is invalid alert -->\r\n        <div class=\"row m-0\" *ngIf=\"alertContent.length > 0\">\r\n          <div class=\"col-12 p-3 alert alert-danger pre-line\">\r\n            {{ alertContent }}\r\n            <!-- button for delete topic-content -->\r\n            <!-- <span class=\"fas fa-times-circle del-content-btn\"></span> -->\r\n          </div>\r\n        </div>\r\n        <!-- row1 has title -->\r\n        <div class=\"row form-group\">\r\n          <div class=\"col-xl-2 col-md-3 col-12\">\r\n            <!-- <label>Title:</label> -->\r\n            <label>{{ compLanguage.createPostTitle }}</label>\r\n          </div>\r\n          <div class=\"col-xl-10 col-md-9 col-12\">\r\n            <input class=\"form-control\" type=\"text\" name=\"title\" [placeholder]=\"compLanguage.createPostTitlePlaceholder\"\r\n              [value]=\"post.title\" (blur)=\"onUpdateTitle($event)\" maxlength=\"200\">\r\n          </div>\r\n        </div>\r\n        <!-- row2 has description -->\r\n        <div class=\"row form-group\">\r\n          <div class=\"col-xl-2 col-md-3 col-12\">\r\n            <!-- <label>Description:</label> -->\r\n            <label>{{ compLanguage.createPostDescription }}</label>\r\n          </div>\r\n          <div class=\"col-xl-10 col-md-9 col-12\">\r\n            <textarea name=\"description\" class=\"form-control\" rows=\"2\" [placeholder]=\"compLanguage.createPostDescriptionPlaceholder\"\r\n              [value]=\"post.description\" (blur)=\"onUpdateDescription($event)\" maxlength=\"500\"></textarea>\r\n          </div>\r\n        </div>\r\n        <!-- row3 has add-cover-button and preview -->\r\n        <div class=\"row form-group\">\r\n          <div class=\"col-sm-5 col-12\">\r\n            <button class=\"btn btn-success\" type=\"button\" (click)=\"filePicker.click()\">{{\r\n              compLanguage.createPostAddCoverBtn }}</button>\r\n            <input class=\"d-none\" type=\"file\" #filePicker (change)=\"onImagePicked($event)\">\r\n          </div>\r\n          <div class=\"col-sm-7 col-12\" *ngIf=\"post.cover.length > 0\">\r\n            <img [src]=\"post.cover\" alt=\"preview\">\r\n            <span class=\"fas fa-times-circle esc-btn\" (click)=\"onDelImageClick()\"></span>\r\n          </div>\r\n        </div>\r\n        <!-- row4 has create-category component -->\r\n        <div class=\"row form-group\">\r\n          <div class=\"col-12\">\r\n            <app-create-category [post]=\"post\" [compLanguage]='compLanguage'></app-create-category>\r\n          </div>\r\n        </div>\r\n        <!-- row5 has create-tag component -->\r\n        <div class=\"row form-group\">\r\n          <div class=\"col-12\">\r\n            <app-create-tag [post]='post' [compLanguage]='compLanguage'></app-create-tag>\r\n          </div>\r\n        </div>\r\n        <!-- row6 has create-location component -->\r\n        <div class=\"row form-group\">\r\n          <div class=\"col-12\">\r\n            <app-create-location [post]=\"post\" [compLanguage]='compLanguage'></app-create-location>\r\n          </div>\r\n        </div>\r\n        <!-- row7 has create-post-content component -->\r\n        <div class=\"row form-group m-0\">\r\n          <div class=\"col-12\">\r\n            <app-create-post-content [post]='post' [compLanguage]='compLanguage'></app-create-post-content>\r\n          </div>\r\n        </div>\r\n        <!-- at the bottom has same invalid alert before save button-->\r\n        <div class=\"row m-0\" *ngIf=\"alertContent.length > 0\">\r\n          <div class=\"col-12 p-3 alert alert-danger pre-line\">\r\n            {{ alertContent }}\r\n            <!-- button for delete topic-content -->\r\n            <!-- <span class=\"fas fa-times-circle del-content-btn\"></span> -->\r\n          </div>\r\n        </div>\r\n        <!-- row alert inform that post save successfully -->\r\n        <div class=\"row m-0\" *ngIf=\"isSaved === true\">\r\n          <div class=\"col-12 p-3 alert alert-success\">\r\n            <a class=\"alert-link pointer\" (click)=\"onViewPost()\">{{ savedSuccessAlertContent }}</a>\r\n          </div>\r\n        </div>\r\n        <!-- row8 has save button -->\r\n        <div class=\"row form-group m-0\">\r\n          <div class=\"col-12 no-padding\">\r\n            <button class=\"btn btn-warning\" (click)=\"onCancel()\">{{ compLanguage.createPostCancelBtn }}</button>\r\n            <button class=\"btn btn-success\" (click)=\"onSave()\">{{ compLanguage.createPostSaveBtn }}</button>\r\n            <!-- <button class=\"btn btn-info\" (click)=\"onTest()\">Test Edit</button> -->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/add-post/create-post/create-post.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/add-post/create-post/create-post.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  margin: 0px;\n  display: block; }\n\n.row {\n  padding: 5px; }\n\ninput[type=\"text\"] {\n  width: 100%;\n  font-size: 17px; }\n\ntextarea {\n  width: 100%;\n  font-size: 17px; }\n\n.comp {\n  background-color: #e1e1ef;\n  height: 100%; }\n\n.hidden-scroll {\n  height: 100%;\n  overflow-y: scroll;\n  overflow-x: hidden; }\n\n.max-height {\n  max-height: 100px; }\n\n.content {\n  background-color: #fff;\n  border-radius: 5px; }\n\n.hidden-scroll::-webkit-scrollbar {\n  width: 0px;\n  background: transparent;\n  display: none; }\n\nimg {\n  width: 100%;\n  height: auto;\n  border-radius: 0.25rem; }\n\nlabel {\n  font-size: 17px;\n  font-weight: bold; }\n\nbutton {\n  font-size: 17px;\n  font-weight: bold;\n  margin-bottom: 15px; }\n\n.esc-btn {\n  cursor: pointer;\n  font-size: 14px;\n  position: absolute;\n  top: 0px;\n  right: 11px; }\n\n.pointer {\n  cursor: pointer; }\n\n.no-padding {\n  padding-left: 0px;\n  padding-right: 0px;\n  text-align: right; }\n\n.no-padding button {\n    margin-left: 15px; }\n\n.del-content-btn {\n  cursor: pointer;\n  font-size: 14px;\n  position: absolute;\n  top: 0px;\n  right: 0px; }\n\n.pre-line {\n  white-space: pre-line; }\n"

/***/ }),

/***/ "./src/app/add-post/create-post/create-post.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/add-post/create-post/create-post.component.ts ***!
  \***************************************************************/
/*! exports provided: CreatePostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePostComponent", function() { return CreatePostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/post.service */ "./src/app/core/services/post.service.ts");
/* harmony import */ var src_app_core_services_server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/server.service */ "./src/app/core/services/server.service.ts");
/* harmony import */ var src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/model/post.model */ "./src/app/model/post.model.ts");
/* harmony import */ var src_app_core_services_constant_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/constant.service */ "./src/app/core/services/constant.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_model_location_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/model/location.model */ "./src/app/model/location.model.ts");
/* harmony import */ var src_app_core_services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/user.service */ "./src/app/core/services/user.service.ts");
/* harmony import */ var src_app_core_services_language_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/language.service */ "./src/app/core/services/language.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CreatePostComponent = /** @class */ (function () {
    function CreatePostComponent(postService, serverService, constant, route, router, user, language) {
        this.postService = postService;
        this.serverService = serverService;
        this.constant = constant;
        this.route = route;
        this.router = router;
        this.user = user;
        this.language = language;
        // local post receive data from service
        // it should has init data until receiving data from server so browser will not has error
        this.post = new src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__["Post"](null, null, [], [], '', '', '', new src_app_model_location_model__WEBPACK_IMPORTED_MODULE_6__["Location"]('', [], '', ''), [], [], '', [], '');
        // if postId == '' => create new post
        // if postId != '' => edit post
        this.postId = '';
        // array store new image need to upload to server
        this.newImageFiles = [];
        this.coverFile = null;
        // variable store current language
        this.compLanguage = this.language.currentLanguage;
        // variable store alert
        this.alertContent = '';
        // saved alert content
        this.savedSuccessAlertContent = this.compLanguage.createPostAlertSaveSuccess;
        // can't Saved alert content
        this.cantSavedAlertContent = this.compLanguage.createPostAlertSaveAlready;
        // validate status of the whole post
        this.postIsValid = false;
        // variable store status that save post successfully or not
        // if already success => can't click save again
        this.isSaved = false;
        this.isUpdate = false;
        // all validate status
        this.validateObject = {
            // variable check valid or not foreach properties
            validateTitle: {
                maxLength: { status: false, message: this.compLanguage.createPostInvalidTitleLength },
                notEmpty: { status: false, message: this.compLanguage.createPostInvalidTitleEmpty }
            },
            validateDesc: {
                maxLength: { status: false, message: this.compLanguage.createPostInvalidDescLength },
                notEmpty: { status: false, message: this.compLanguage.createPostInvalidDescEmpty }
            },
            validateCover: {
                notEmpty: { status: false, message: this.compLanguage.createPostInvalidCoverEmpty }
            },
            validateCategory: {
                notEmpty: { status: false, message: this.compLanguage.createPostInvalidCategoryEmpty }
            },
            validateTag: {
                maxLength: { status: false, message: this.compLanguage.createPostInvalidTagLength }
            },
            validatePlace: {
                maxLength: { status: false, message: this.compLanguage.createPostInvalidPlaceLength },
                notEmpty: { status: false, message: this.compLanguage.createPostInvalidPlaceEmpty }
            },
            validateAddress: {
                maxLength: { status: false, message: this.compLanguage.createPostInvalidAddressLength }
            },
            validateProvinceCity: {
                notEmpty: { status: false, message: this.compLanguage.createPostInvalidProvinceEmpty }
            },
            validatePostContent: {
                notEmpty: { status: false, message: this.compLanguage.createPostInvalidTopicEmpty }
            }
        };
    }
    CreatePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe param change
        this.route.params.subscribe(function (params) {
            // check empty param or not
            if (params['id'] !== undefined) {
                _this.postId = params['id'];
            }
            // check valid post Id or not
            if (_this.postId.length !== 24) {
                if (_this.postId === '') {
                    // if id === '', component load as create new post
                }
                else {
                    // invalid Id => not-found
                    _this.router.navigate(['/not-found']);
                }
            }
            else {
                _this.isUpdate = true;
                _this.serverService.getOnePost(_this.postId).subscribe(function (resData) {
                    if (resData.data !== null && resData.data !== undefined) {
                        // if user is not the author of post => cant edit
                        if (_this.user.currentUser._id !== resData.data.authorId) {
                            _this.router.navigate(['/not-found']);
                        }
                        else {
                            _this.post = resData.data;
                        }
                    }
                    else {
                        _this.router.navigate(['/not-found']);
                    }
                });
            }
        });
        // subscribe when change language
        this.language.hasChangeLanguage.asObservable().subscribe(function () {
            _this.compLanguage = _this.language.currentLanguage;
            _this.changeLanguage();
        });
        // subscribe when hasNewImage
        this.subscribeHasNewImage();
        // subscribe when hasImgDeleted
        this.subscribeHasImgDeleted();
        // subscribe when has new change and need validate
        this.postService.categoryChanged.asObservable().subscribe(function () {
            _this.alertContent = _this.validateCategory();
        });
        this.postService.placeChanged.asObservable().subscribe(function () {
            _this.alertContent = _this.validatePlace();
        });
        this.postService.provinceCityChanged.asObservable().subscribe(function () {
            _this.alertContent = _this.validateProvinceCity();
        });
        this.postService.addressChanged.asObservable().subscribe(function () {
            _this.alertContent = _this.validateAddress();
        });
        this.postService.postContentChanged.asObservable().subscribe(function () {
            _this.alertContent = _this.validatePostContent();
        });
        this.postService.newAlert.asObservable().subscribe(function (location) {
            if (location.length >= 2) {
                _this.alertContent = _this.validateObject[location[0]][location[1]]['message'];
            }
        });
    };
    /**
     * @description function subscribe for hasNewImage
     * receive new image mean there may be an image be override
     * we need remove the old file and push the new ones
     */
    CreatePostComponent.prototype.subscribeHasNewImage = function () {
        var _this = this;
        this.postService.hasNewImage.asObservable().subscribe(function (newImageInfo) {
            // filt out old image file
            _this.newImageFiles = _this.newImageFiles.filter(function (eachEle) {
                // only keep image of other postContent, remove image has deleted
                return eachEle.contentId !== newImageInfo.contentId;
            });
            // store temporary new image on newImages array
            // until user click "save", upload all to server
            _this.newImageFiles.push(newImageInfo);
            // line below only for test
            // this.uploadAllImage();
        });
    };
    // function subscribe when hasImgDeleted
    CreatePostComponent.prototype.subscribeHasImgDeleted = function () {
        var _this = this;
        this.postService.hasImgDeleted.asObservable().subscribe(function (postContentId) {
            _this.newImageFiles = _this.newImageFiles.filter(function (eachEle) {
                // only keep image of other postContent, remove image has deleted
                return eachEle.contentId !== postContentId;
            });
        });
    };
    CreatePostComponent.prototype.onImagePicked = function (event) {
        var _this = this;
        // get file of new image from event
        var file = event.target.files[0];
        // config reader to read file and show preview
        var reader = new FileReader();
        reader.onload = function () {
            _this.post.cover = reader.result.toString();
        };
        reader.readAsDataURL(file);
        // store image temporary in newImages arra
        // this cover will be store on server when user click save
        this.coverFile = file;
        // reset the <input> file for the next time
        event.target.value = '';
    };
    CreatePostComponent.prototype.onSave = function () {
        var _this = this;
        if (this.isSaved === true) {
            this.alertContent = this.cantSavedAlertContent;
            return;
        }
        // go to validate all form
        this.validateAll();
        if (this.postIsValid === true) {
            // add cover to newImageFiles before upload all newImageFiles to server
            if (this.coverFile !== null && this.coverFile !== undefined) {
                this.newImageFiles.push({ imgFile: this.coverFile, contentId: 'cover' });
            }
            this.serverService.uploadImage(this.newImageFiles).subscribe(function (resData) {
                if (resData) {
                    // update all images url before save
                    _this.newImageFiles.forEach(function (imageFileItem, index) {
                        // find true postContent has this image to update url
                        var needUpdateImageUrl = _this.post.postContents.find(function (eachEle) {
                            return eachEle._id === imageFileItem.contentId;
                        });
                        if (needUpdateImageUrl !== null && needUpdateImageUrl !== undefined) {
                            needUpdateImageUrl.image = resData.imageUrls[index];
                        }
                    });
                    // update cover url, that url located at the end of the array
                    if (_this.coverFile && resData.imageUrls[resData.imageUrls.length - 1]) {
                        _this.post.cover = resData.imageUrls[resData.imageUrls.length - 1];
                    }
                    // save post, if id == '', => this is new post and need create new post
                    // if id already exist, => this is old post and need update post
                    if (_this.postId === '') {
                        // fix some default infomation for new post
                        _this.post._id = null;
                        _this.post.createdTime = new Date();
                        _this.post.approvedTime = null;
                        _this.post.authorId = _this.user.currentUser._id;
                        _this.post.rating = [];
                        _this.post.status = _this.constant.POST_STATUS.PENDING;
                        _this.serverService.postOnePost(_this.post)
                            .subscribe(function (responseData) {
                            if (responseData) {
                                _this.isSaved = true;
                                _this.postId = responseData.postId;
                            }
                        });
                    }
                    else if (_this.postId.length === 24) {
                        // save edited post
                        // fix some default infomation for update post
                        _this.post.approvedTime = null;
                        _this.post.status = _this.constant.POST_STATUS.PENDING;
                        _this.serverService.updateOnePost(_this.post)
                            .subscribe(function (responseData) {
                            if (responseData) {
                                _this.isSaved = true;
                                _this.postId = responseData.postId;
                            }
                        });
                    }
                }
                else {
                    // can not get response
                }
            });
        }
        else {
        }
    };
    CreatePostComponent.prototype.onViewPost = function () {
        this.router.navigate(['/view-post', this.postId]);
    };
    CreatePostComponent.prototype.onLeaveImgPicker = function () {
        this.alertContent = this.validateCover();
    };
    CreatePostComponent.prototype.onDelImageClick = function () {
        this.post.cover = '';
        this.coverFile = null;
        this.alertContent = this.validateCover();
    };
    CreatePostComponent.prototype.onCancel = function () {
        // on create new post
        // this.router.navigate(['/create-post']);
        this.post = new src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__["Post"](null, null, [], [], '', '', '', new src_app_model_location_model__WEBPACK_IMPORTED_MODULE_6__["Location"]('', [], '', ''), [], [], '', [], '');
        // on edit post
        // if (this.postId.length === 24) {
        //   this.serverService.getOnePost(this.postId).subscribe((resData) => {
        //     if (resData.data !== null && resData.data !== undefined) {
        //       this.post = resData.data;
        //     } else {
        //       this.router.navigate(['/not-found']);
        //     }
        //   });
        // }
    };
    CreatePostComponent.prototype.onUpdateTitle = function (event) {
        // validate here
        this.post.title = event.target.value;
        this.alertContent = this.validateTitle();
    };
    CreatePostComponent.prototype.onUpdateDescription = function (event) {
        // validate here
        this.post.description = event.target.value;
        this.alertContent = this.validateDescription();
    };
    CreatePostComponent.prototype.changeLanguage = function () {
        this.validateObject.validateTitle.notEmpty.message = this.compLanguage.createPostInvalidTitleEmpty;
        this.validateObject.validateTitle.maxLength.message = this.compLanguage.createPostInvalidTitleLength;
        this.validateObject.validateDesc.maxLength.message = this.compLanguage.createPostInvalidDescLength;
        this.validateObject.validateDesc.notEmpty.message = this.compLanguage.createPostInvalidDescEmpty;
        this.validateObject.validateCover.notEmpty.message = this.compLanguage.createPostInvalidCoverEmpty;
        this.validateObject.validateCategory.notEmpty.message = this.compLanguage.createPostInvalidCategoryEmpty;
        this.validateObject.validateTag.maxLength.message = this.compLanguage.createPostInvalidTagLength;
        this.validateObject.validatePlace.maxLength.message = this.compLanguage.createPostInvalidPlaceLength;
        this.validateObject.validatePlace.notEmpty.message = this.compLanguage.createPostInvalidPlaceEmpty;
        this.validateObject.validateAddress.maxLength.message = this.compLanguage.createPostInvalidAddressLength;
        this.validateObject.validateProvinceCity.notEmpty.message = this.compLanguage.createPostInvalidProvinceEmpty;
        this.validateObject.validatePostContent.notEmpty.message = this.compLanguage.createPostInvalidTopicEmpty;
        this.cantSavedAlertContent = this.compLanguage.createPostAlertSaveAlready;
        this.savedSuccessAlertContent = this.compLanguage.createPostAlertSaveSuccess;
    };
    CreatePostComponent.prototype.validateAll = function () {
        this.alertContent =
            this.validateTitle() + '\n'
                + this.validateDescription() + '\n'
                + this.validateCover() + '\n'
                + this.validateCategory() + '\n'
                + this.validatePlace() + '\n'
                + this.validateProvinceCity() + '\n'
                + this.validateAddress() + '\n'
                + this.validatePostContent();
        this.alertContent = this.alertContent.replace(/\n+/g, '\n');
        this.alertContent = this.alertContent.trim();
        if (this.alertContent === '') {
            this.postIsValid = true;
        }
        else {
            this.postIsValid = false;
        }
    };
    CreatePostComponent.prototype.validateTitle = function () {
        if (this.post.title.length <= 0) {
            this.validateObject.validateTitle.notEmpty.status = false;
            this.validateObject.validateTitle.maxLength.status = true;
            return this.validateObject.validateTitle.notEmpty.message;
        }
        else if (this.post.title.length > 200) {
            this.validateObject.validateTitle.notEmpty.status = true;
            this.validateObject.validateTitle.maxLength.status = false;
            return this.validateObject.validateTitle.maxLength.message;
        }
        else {
            this.validateObject.validateTitle.notEmpty.status = true;
            this.validateObject.validateTitle.maxLength.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.validateDescription = function () {
        if (this.post.description.length <= 0) {
            this.validateObject.validateDesc.notEmpty.status = false;
            this.validateObject.validateDesc.maxLength.status = true;
            return this.validateObject.validateDesc.notEmpty.message;
        }
        else if (this.post.title.length > 500) {
            this.validateObject.validateDesc.notEmpty.status = true;
            this.validateObject.validateDesc.maxLength.status = false;
            return this.validateObject.validateDesc.maxLength.message;
        }
        else {
            this.validateObject.validateDesc.notEmpty.status = true;
            this.validateObject.validateDesc.maxLength.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.validateCover = function () {
        if (!this.coverFile && !this.isUpdate) {
            this.validateObject.validateCover.notEmpty.status = false;
            return this.validateObject.validateCover.notEmpty.message;
        }
        else {
            this.validateObject.validateCover.notEmpty.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.validatePostContent = function () {
        if (this.post.postContents.length <= 0) {
            this.validateObject.validatePostContent.notEmpty.status = false;
            return this.validateObject.validatePostContent.notEmpty.message;
        }
        else {
            this.validateObject.validatePostContent.notEmpty.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.validateCategory = function () {
        if (this.post.categories.length <= 0) {
            this.validateObject.validateCategory.notEmpty.status = false;
            return this.validateObject.validateCategory.notEmpty.message;
        }
        else {
            this.validateObject.validateCategory.notEmpty.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.validatePlace = function () {
        if (this.post.location.locationName.length <= 0) {
            this.validateObject.validatePlace.notEmpty.status = false;
            this.validateObject.validatePlace.maxLength.status = true;
            return this.validateObject.validatePlace.notEmpty.message;
        }
        else if (this.post.location.locationName.length > 200) {
            this.validateObject.validatePlace.notEmpty.status = true;
            this.validateObject.validatePlace.maxLength.status = false;
            return this.validateObject.validatePlace.maxLength.message;
        }
        else {
            this.validateObject.validatePlace.notEmpty.status = true;
            this.validateObject.validatePlace.maxLength.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.validateProvinceCity = function () {
        if (this.post.location.provinceCity.length <= 0) {
            this.validateObject.validateProvinceCity.notEmpty.status = false;
            return this.validateObject.validateProvinceCity.notEmpty.message;
        }
        else {
            this.validateObject.validateProvinceCity.notEmpty.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.validateAddress = function () {
        if (this.post.location.address.length > 300) {
            this.validateObject.validateAddress.maxLength.status = false;
            return this.validateObject.validateAddress.maxLength.message;
        }
        else {
            this.validateObject.validateAddress.maxLength.status = true;
            return '';
        }
    };
    CreatePostComponent.prototype.onTest = function () {
        this.router.navigate(['/create-post', '5c1a4602f0491d2a9c8a2ff7']);
    };
    CreatePostComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-post',
            template: __webpack_require__(/*! ./create-post.component.html */ "./src/app/add-post/create-post/create-post.component.html"),
            styles: [__webpack_require__(/*! ./create-post.component.scss */ "./src/app/add-post/create-post/create-post.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_1__["PostService"],
            src_app_core_services_server_service__WEBPACK_IMPORTED_MODULE_2__["ServerService"],
            src_app_core_services_constant_service__WEBPACK_IMPORTED_MODULE_4__["ConstantService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            src_app_core_services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            src_app_core_services_language_service__WEBPACK_IMPORTED_MODULE_8__["LanguageService"]])
    ], CreatePostComponent);
    return CreatePostComponent;
}());



/***/ }),

/***/ "./src/app/add-post/create-post/create-tag/create-tag.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-tag/create-tag.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- row1 has label, dropdown and button Add -->\r\n<div class=\"row\">\r\n  <div class=\"col-xl-2 col-md-3 col-2\">\r\n    <label>{{ compLanguage.createPostTag }}</label>\r\n  </div>\r\n  <div class=\"col-xl-8 col-md-6 col-10\">\r\n    <input type=\"text\" class=\"form-control\" [placeholder]=\"compLanguage.createPostTagPlaceholder\" #inputTag (keyup)=\"onPressEnter($event)\"\r\n      maxlength=\"40\">\r\n  </div>\r\n  <div class=\"col-xl-2 col-md-3 col-12 mt-3 mt-md-0\">\r\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"onAddTag(inputTag)\">{{ compLanguage.createPostAddTagBtn }}</button>\r\n  </div>\r\n</div>\r\n<!-- row2 has list all tags added, each tags can be deleted by a 'X' button on top-right -->\r\n<div class=\"row\" *ngIf=\"post.tags.length > 0\">\r\n  <div class=\"col-12\">\r\n    <div class=\"tag\" *ngFor=\"let tag of post.tags\">\r\n      {{ tag.tagContent }}<span class=\"fas fa-times-circle esc-btn\" (click)=\"onRemoveTag(tag)\"></span>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/add-post/create-post/create-tag/create-tag.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-tag/create-tag.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input {\n  width: 100%;\n  height: auto;\n  font-size: 17px; }\n\nlabel {\n  font-size: 17px;\n  font-weight: bold; }\n\n.tag {\n  font-size: 14px;\n  font-weight: bold;\n  margin-top: 15px;\n  margin-right: 15px;\n  padding: 10px;\n  background-color: lightgray;\n  border-color: transparent;\n  border-radius: 2rem;\n  cursor: default;\n  overflow: visible;\n  position: relative;\n  display: inline-block; }\n\n.esc-btn {\n  font-size: 14px;\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  cursor: pointer; }\n\nbutton {\n  width: 100%;\n  font-size: 17px;\n  font-weight: bold; }\n"

/***/ }),

/***/ "./src/app/add-post/create-post/create-tag/create-tag.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/add-post/create-post/create-tag/create-tag.component.ts ***!
  \*************************************************************************/
/*! exports provided: CreateTagComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateTagComponent", function() { return CreateTagComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_model_tag_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/model/tag.model */ "./src/app/model/tag.model.ts");
/* harmony import */ var src_app_core_services_tag_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/tag.service */ "./src/app/core/services/tag.service.ts");
/* harmony import */ var src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/model/post.model */ "./src/app/model/post.model.ts");
/* harmony import */ var src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/post.service */ "./src/app/core/services/post.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreateTagComponent = /** @class */ (function () {
    function CreateTagComponent(tagService, postService) {
        this.tagService = tagService;
        this.postService = postService;
        // all tag from server to recommend with user
        this.allTags = [];
    }
    CreateTagComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tagService.newTagsUpdated.asObservable().subscribe(function () {
            // update tags same as data on service
            _this.allTags = _this.tagService.tags;
        });
    };
    CreateTagComponent.prototype.onRemoveTag = function (removedTag) {
        this.post.tags = this.post.tags.filter(function (eachEle) {
            return eachEle.tagContent !== removedTag.tagContent;
            //   // return eachEle._id !== removedCategory._id;
        });
        // console.log(this.tags);
    };
    CreateTagComponent.prototype.onAddTag = function (inputTagElement) {
        var newTag = new src_app_model_tag_model__WEBPACK_IMPORTED_MODULE_1__["Tag"](inputTagElement.value);
        // if tag empty => go out
        if (newTag.tagContent.length <= 0) {
            return;
        }
        // if tag too long => alert
        if (newTag.tagContent.length > 40) {
            // emit location of message: create-post.component.validateObject.validateTag.maxLength.message
            this.postService.newAlert.next(['validateTag', 'maxLength']);
            return;
        }
        var duplicateTag = this.post.tags.find(function (eachEle) {
            return eachEle.tagContent === newTag.tagContent;
        });
        // if duplicateTag != null mean newTag already exist, don't need to add again
        if (duplicateTag === null || duplicateTag === undefined) {
            newTag._id = '';
            this.post.tags.push(newTag);
        }
        // console.log(this.tags);
    };
    CreateTagComponent.prototype.onPressEnter = function (event) {
        if (event.key === 'Enter') {
            this.onAddTag(event.target);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", src_app_model_post_model__WEBPACK_IMPORTED_MODULE_3__["Post"])
    ], CreateTagComponent.prototype, "post", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CreateTagComponent.prototype, "compLanguage", void 0);
    CreateTagComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-tag',
            template: __webpack_require__(/*! ./create-tag.component.html */ "./src/app/add-post/create-post/create-tag/create-tag.component.html"),
            styles: [__webpack_require__(/*! ./create-tag.component.scss */ "./src/app/add-post/create-post/create-tag/create-tag.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_core_services_tag_service__WEBPACK_IMPORTED_MODULE_2__["TagService"], src_app_core_services_post_service__WEBPACK_IMPORTED_MODULE_4__["PostService"]])
    ], CreateTagComponent);
    return CreateTagComponent;
}());



/***/ }),

/***/ "./src/app/core/services/post-category.service.ts":
/*!********************************************************!*\
  !*** ./src/app/core/services/post-category.service.ts ***!
  \********************************************************/
/*! exports provided: PostCategoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostCategoryService", function() { return PostCategoryService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _server_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server.service */ "./src/app/core/services/server.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostCategoryService = /** @class */ (function () {
    function PostCategoryService(http, server) {
        this.http = http;
        this.server = server;
        this.allCategories = [];
        this.newCategoriesUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    PostCategoryService.prototype.getAllCategories = function () {
        var _this = this;
        // if (this.allCategories.length === 0) {
        this.server.getListPostCategories().subscribe((function (resData) {
            if (resData.data !== undefined && resData.data !== null) {
                _this.allCategories = resData.data;
                _this.newCategoriesUpdated.next();
            }
            // else err handling
        }));
        // }
    };
    PostCategoryService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _server_service__WEBPACK_IMPORTED_MODULE_3__["ServerService"]])
    ], PostCategoryService);
    return PostCategoryService;
}());



/***/ }),

/***/ "./src/app/core/services/province-city.service.ts":
/*!********************************************************!*\
  !*** ./src/app/core/services/province-city.service.ts ***!
  \********************************************************/
/*! exports provided: ProvinceCityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvinceCityService", function() { return ProvinceCityService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./server.service */ "./src/app/core/services/server.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProvinceCityService = /** @class */ (function () {
    function ProvinceCityService(http, server) {
        this.http = http;
        this.server = server;
        this.allProvinceCity = [];
    }
    ProvinceCityService.prototype.getAllProvinceCity = function () {
        return this.server.getListProvinceCity();
        // .subscribe((resData) => {
        //   if (resData.data) {
        //     this.allProvinceCity = resData.data;
        //   }
        //   // else err handling
        // });
    };
    ProvinceCityService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _server_service__WEBPACK_IMPORTED_MODULE_2__["ServerService"]])
    ], ProvinceCityService);
    return ProvinceCityService;
}());



/***/ }),

/***/ "./src/app/core/services/tag.service.ts":
/*!**********************************************!*\
  !*** ./src/app/core/services/tag.service.ts ***!
  \**********************************************/
/*! exports provided: TagService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TagService", function() { return TagService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _server_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server.service */ "./src/app/core/services/server.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TagService = /** @class */ (function () {
    function TagService(http, server) {
        this.http = http;
        this.server = server;
        this.tags = [];
        // create an Observable will emit when has new change
        this.newTagsUpdated = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    TagService.prototype.getAllTags = function () {
        var _this = this;
        this.server.getListTags().subscribe((function (resData) {
            if (resData.data) {
                _this.tags = resData.data;
                _this.newTagsUpdated.next();
            }
            // else err handling
        }));
    };
    TagService.prototype.updateTags = function () {
    };
    TagService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _server_service__WEBPACK_IMPORTED_MODULE_3__["ServerService"]])
    ], TagService);
    return TagService;
}());



/***/ }),

/***/ "./src/app/model/tag.model.ts":
/*!************************************!*\
  !*** ./src/app/model/tag.model.ts ***!
  \************************************/
/*! exports provided: Tag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tag", function() { return Tag; });
var Tag = /** @class */ (function () {
    function Tag(tagContent) {
        this.tagContent = tagContent;
    }
    return Tag;
}());



/***/ })

}]);
//# sourceMappingURL=src-app-add-post-add-post-module.js.map