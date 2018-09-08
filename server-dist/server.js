/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(1);
const bodyParser = __webpack_require__(2);
const config = __webpack_require__(3);
const cors = __webpack_require__(4);
const mongodb_bag2bag_config_1 = __webpack_require__(5);
const types_1 = __webpack_require__(10);
const container_1 = __webpack_require__(12);
__webpack_require__(11);
const winston_1 = __webpack_require__(7);
const app = express();
winston_1.default.info('after app express');
const HOST_CONFIG = config.get("appConfig.hostConfig");
winston_1.default.info('after HOST_CONFIG');
const PORT_NO = HOST_CONFIG.port;
winston_1.default.debug(`HOST_CONFIG PORT NO IS ${PORT_NO}`);
app.set('port', PORT_NO);
winston_1.default.debug(`PORT NO IS ${PORT_NO}`);
app.use(bodyParser.json());
winston_1.default.info('after bodypaser use');
app.use(bodyParser.urlencoded({ extended: true }));
winston_1.default.info('before cors use');
app.use(cors());
winston_1.default.info('after cors use');
winston_1.default.info('new server');
winston_1.default.info('before constroller');
const controllers = container_1.default.getAll(types_1.default.Controller);
winston_1.default.info('before For each constroller');
controllers.forEach(controller => controller.register(app));
winston_1.default.info('after For each constroller and before server request');
app.get('/', (request, response, next) => {
    winston_1.default.info('Server is working perfectly');
    response.send('Server is working perfectly');
});
winston_1.default.info('before mongodb init');
mongodb_bag2bag_config_1.default.init();
winston_1.default.info('after mongodb init and before port listener');
app.use((err, req, res, next) => {
    winston_1.default.info('inside error handller');
    res.status(500).json({ error: 'Error Handler' });
});
app.listen(app.get('port'), () => {
    winston_1.default.info(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    winston_1.default.info('Press CTRL-C to stop\n');
});
exports.default = app;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(6);
const winston_1 = __webpack_require__(7);
const config = __webpack_require__(3);
class MongooseConfig {
    constructor() {
        winston_1.default.info('Inside mongodb configuration file');
    }
    init() {
        winston_1.default.info('inside init');
        let dbConfig = config.get('appConfig.dbConfig');
        winston_1.default.info('inside init before mongo connection');
        mongoose.connect(dbConfig.url);
        const db = mongoose.connection;
        winston_1.default.info('inside init before mongo debug');
        mongoose.set('debug', true);
        db.on('error', (e) => {
            winston_1.default.info('error while creating mongodb connection');
            winston_1.default.error(e);
        });
        db.once('open', () => { winston_1.default.info('MongoDB connection is created'); });
    }
}
const mongoConfig = new MongooseConfig();
exports.default = mongoConfig;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const winston = __webpack_require__(8);
const path_1 = __webpack_require__(9);
const LOGS_FOLDER_PATH = path_1.join(process.cwd(), 'logs');
const options = {
    infoFile: {
        level: 'info',
        filename: `info.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    exceptionFile: {
        level: 'error',
        filename: `exceptions.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const LOGGER = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    level: "debug",
    transports: [
        new winston.transports.File(options.infoFile),
    ],
    exceptionHandlers: [
        new winston.transports.File(options.exceptionFile),
    ]
});
if (true) {
    LOGGER.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
exports.default = LOGGER;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(11);
const TYPES = {
    BookingRepository: Symbol('BookingRepository'),
    EmailService: Symbol('EmailService'),
    SmsService: Symbol('SmsService'),
    HttpUtil: Symbol('HttpUtil'),
    WelcomeService: Symbol('WelcomeService'),
    UserRepository: Symbol('UserRepository'),
    Controller: Symbol('Controller')
};
exports.default = TYPES;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(13);
const types_1 = __webpack_require__(10);
__webpack_require__(11);
const email_controller_1 = __webpack_require__(14);
const email_service_impl_1 = __webpack_require__(16);
const booking_repository_1 = __webpack_require__(21);
const sms_service_impl_1 = __webpack_require__(55);
const http_util_impl_1 = __webpack_require__(56);
const sms_controller_1 = __webpack_require__(59);
const welcome_service_impl_1 = __webpack_require__(60);
const user_repository_1 = __webpack_require__(61);
const welcome_controller_1 = __webpack_require__(63);
const email_and_sms_controller_1 = __webpack_require__(64);
const container = new inversify_1.Container();
container.bind(types_1.default.Controller).to(email_controller_1.EmailController);
container.bind(types_1.default.Controller).to(sms_controller_1.SMSController);
container.bind(types_1.default.Controller).to(welcome_controller_1.WelcomeController);
container.bind(types_1.default.Controller).to(email_and_sms_controller_1.EmailAndSmsController);
container.bind(types_1.default.EmailService).to(email_service_impl_1.EmailServiceImpl);
container.bind(types_1.default.WelcomeService).to(welcome_service_impl_1.WelcomeServiceImp);
container.bind(types_1.default.SmsService).to(sms_service_impl_1.SmsServiceImpl);
container.bind(types_1.default.HttpUtil).to(http_util_impl_1.HttpUtilImpl);
container.bind(types_1.default.BookingRepository).to(booking_repository_1.BookingRepositoryImpl);
container.bind(types_1.default.UserRepository).to(user_repository_1.UserRepositoryImpl);
exports.default = container;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(13);
const types_1 = __webpack_require__(10);
__webpack_require__(11);
const winston_1 = __webpack_require__(7);
const route_constants_1 = __webpack_require__(15);
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    register(app) {
        winston_1.default.info('Inside registered !');
        app.post(`${route_constants_1.ROUTE_CONSTANTS.REST_EMAIL_ROUTE}/send/booking/mail/to/customer-care/by/:bookingId`, this.sendBookingEmailToCustomerCare.bind(this));
        app.post(`${route_constants_1.ROUTE_CONSTANTS.REST_EMAIL_ROUTE}/send/booking/mail/to/all/by/:bookingId`, this.sendBookingEmailToAll.bind(this));
        app.post(`${route_constants_1.ROUTE_CONSTANTS.REST_EMAIL_ROUTE}/send/booking/mail/to/hotel-vendor/by/:bookingId`, this.sendBookingEmailToHotelVendor.bind(this));
        app.post(`${route_constants_1.ROUTE_CONSTANTS.REST_EMAIL_ROUTE}/send/booking/mail/to/customer/by/:bookingId`, this.sendBookingEmailToCustomerAndCustomerCare.bind(this));
    }
    sendBookingEmailToCustomerCare(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToCustomerCare(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    sendBookingEmailToHotelVendor(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToHotelVendor(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    sendBookingEmailToAll(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToAll(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    sendBookingEmailToCustomerAndCustomerCare(req, res, next) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId', bookingId);
        this.emailService.sendBookingEmailToCustomerAndCustomerCare(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
};
EmailController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.EmailService)),
    __metadata("design:paramtypes", [Object])
], EmailController);
exports.EmailController = EmailController;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_CONSTANTS = {
    REST_API_ROUTE: '/rest/admin/api',
    REST_EMAIL_ROUTE: '/rest/admin/api/emails',
    REST_SMS_ROUTE: '/rest/admin/api/sms',
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __webpack_require__(17);
__webpack_require__(11);
const config = __webpack_require__(3);
const inversify_1 = __webpack_require__(13);
const types_1 = __webpack_require__(10);
const winston_1 = __webpack_require__(7);
const constants_1 = __webpack_require__(18);
const querystring_1 = __webpack_require__(19);
const moment = __webpack_require__(20);
const MAIL_CONFIG = config.get('appConfig.mailConfig');
let EmailServiceImpl = class EmailServiceImpl {
    constructor() {
        winston_1.default.info('Email Services called');
    }
    sendBookingEmailToCustomerCare(bookingId) {
        winston_1.default.info('Inside sendBookingEmailToCustomerCare ');
        return this.initBookingEmailProcess(bookingId, constants_1.CONSTANTS.TO_CUSTOMER_CARE);
    }
    sendBookingEmailToHotelVendor(bookingId) {
        winston_1.default.info('Inside sendBookingEmailToHotelVendor ');
        return this.initBookingEmailProcess(bookingId, constants_1.CONSTANTS.TO_VENDOR);
    }
    sendBookingEmailToAll(bookingId) {
        winston_1.default.info('Inside sendBookingEmailToAll ');
        return this.initBookingEmailProcess(bookingId, constants_1.CONSTANTS.TO_ALL);
    }
    sendBookingEmailToCustomerAndCustomerCare(bookingId) {
        winston_1.default.info('Inside sendBookingEmailToCustomerAndCustomerCare ');
        return this.initBookingEmailProcess(bookingId, constants_1.CONSTANTS.TO_CUSTOMER);
    }
    sendMail(recipientType, bookingModel) {
        let postData = this.createBookingQueryStringDataForMailByRecipientType(recipientType, bookingModel);
        return this.httpUtil.callElasticMailApiToSendMail(postData);
    }
    initBookingEmailProcess(bookingId, recipientType) {
        winston_1.default.info('inside initBookingEmailProcess');
        return rxjs_1.Observable.create((observer) => {
            this.bookingRepositoryDb.getBookingDataForEmail(bookingId).subscribe((data) => {
                winston_1.default.debug(JSON.stringify(data));
                let bookingModel = data[0];
                this.sendMail(recipientType, bookingModel)
                    .subscribe((result) => {
                    observer.next('Mail sent successfully');
                }, (error) => {
                    observer.error(error);
                });
            }, (error) => {
                winston_1.default.error(`error is ${error}`);
                observer.error('error while calling');
            });
        });
    }
    createBookingQueryStringDataForMailByRecipientType(recipientType, bookingModel) {
        winston_1.default.info('inside createBookingQueryStringDataForMailByRecipientType');
        switch (recipientType) {
            case constants_1.CONSTANTS.TO_CUSTOMER:
                return this.createBookingQueryStringDataForMail(bookingModel.guestEmail, MAIL_CONFIG.care_email_id, null, bookingModel);
            case constants_1.CONSTANTS.TO_VENDOR:
                return this.createBookingQueryStringDataForMail(bookingModel.hotelOwnerEmail, null, null, bookingModel);
            case constants_1.CONSTANTS.TO_CUSTOMER_CARE:
                return this.createBookingQueryStringDataForMail(MAIL_CONFIG.care_email_id, null, null, bookingModel);
            default:
                return this.createBookingQueryStringDataForMail(bookingModel.guestEmail, bookingModel.hotelOwnerEmail, MAIL_CONFIG.care_email_id, bookingModel);
        }
    }
    createBookingQueryStringDataForMail(to, cc, bcc, bookingModel) {
        winston_1.default.info(`create booking query data for email and booking id is ${bookingModel._id}`);
        const postData = querystring_1.stringify({
            username: MAIL_CONFIG.username,
            api_key: MAIL_CONFIG.api_key,
            trackClicks: true,
            template: MAIL_CONFIG.booking_template,
            isTransactional: true,
            from: MAIL_CONFIG.from,
            from_name: MAIL_CONFIG.from_name,
            subject: `${MAIL_CONFIG.booking_subject} ${bookingModel.hotelName}`,
            msgTo: to,
            msgCC: cc,
            msgBcc: bcc,
            merge_bookingid: `${bookingModel._id}`,
            merge_checkindate: moment(bookingModel.checkinDate).format("MMMM Do YYYY"),
            merge_checkintime: moment(bookingModel.checkinTime).format('h:mm a'),
            merge_checkoutdate: moment(bookingModel.checkoutDate).format("MMMM Do YYYY"),
            merge_checkouttime: moment(bookingModel.checkoutTime).format('h:mm a'),
            merge_briefdescription: bookingModel.briefDescription,
            merge_bag2baglogo: constants_1.CONSTANTS.BAG_2_BAG_LOGO,
            merge_imagepath: constants_1.CONSTANTS.SERVER_PATH + bookingModel.hotelFrontImage,
            merge_guestname: bookingModel.guestName,
            merge_mobilenumber: bookingModel.mobileNumber,
            merge_status: bookingModel.status,
            merge_staytype: bookingModel.stayType,
            merge_hotelname: bookingModel.hotelName,
            merge_hoteladdress: bookingModel.hotelAddress,
            merge_hotelowneremail: bookingModel.hotelOwnerEmail,
            merge_guesttype: bookingModel.roomToGuestMapping[0].guestType,
            merge_hourtype: bookingModel.roomToGuestMapping[0].hourType,
            merge_roomtype: bookingModel.roomToGuestMapping[0].roomType,
            merge_paymentmode: bookingModel.payment.paymentMode === 'Razor' ? 'Online Payment' : bookingModel.payment.paymentMode,
            merge_paystatus: bookingModel.payment.payStatus,
            merge_payamount: bookingModel.payment.payAmount,
            merge_actualrate: bookingModel.payment.actualRate,
            merge_discount: bookingModel.payment.discount,
            merge_paidamount: bookingModel.payment.displayRate - bookingModel.payment.payAmount,
            merge_displayrate: bookingModel.payment.displayRate,
        });
        winston_1.default.debug(`bokining url is :${postData}`);
        return postData;
    }
};
__decorate([
    inversify_1.inject(types_1.default.BookingRepository),
    __metadata("design:type", Object)
], EmailServiceImpl.prototype, "bookingRepositoryDb", void 0);
__decorate([
    inversify_1.inject(types_1.default.HttpUtil),
    __metadata("design:type", Object)
], EmailServiceImpl.prototype, "httpUtil", void 0);
EmailServiceImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EmailServiceImpl);
exports.EmailServiceImpl = EmailServiceImpl;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = {
    SERVER_PATH: 'http://ec2-35-154-36-55.ap-south-1.compute.amazonaws.com:8080/images/img-800x500/',
    BAG_2_BAG_LOGO: 'http://ec2-35-154-36-55.ap-south-1.compute.amazonaws.com:8080/images/logo/app-logo.png',
    TO_CUSTOMER: 'TO_CUSTOMER',
    TO_VENDOR: 'TO_VENDOR',
    TO_CUSTOMER_CARE: 'TO_CUSTOMER_CARE',
    TO_ALL: 'TO_ALL',
    MINISTAY_BOOKING_CONFIRMATION_SMS: 'MINISTAY_BOOKING_CONFIRMATION_SMS',
    REGULARSTAY_BOOKING_CONFIRMATION_SMS: 'REGULARSTAY_BOOKING_CONFIRMATION_SMS',
    NIGHTSTAY_BOOKING_CONFIRMATION_SMS: 'NIGHTSTAY_BOOKING_CONFIRMATION_SMS',
    PAYMENT_CONFIRMATION_SMS: 'PAYMENT_CONFIRMATION_SMS',
    BOOKING_CANCELLATION_SMS: 'BOOKING_CANCELLATION_SMS',
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(6);
const booking_model_1 = __webpack_require__(22);
const from_1 = __webpack_require__(23);
const inversify_1 = __webpack_require__(13);
__webpack_require__(11);
const winston_1 = __webpack_require__(7);
let BookingRepositoryImpl = class BookingRepositoryImpl {
    constructor() {
        winston_1.default.info('Email Repository');
    }
    getBookingDataForEmail(bookingId) {
        winston_1.default.info('id is:' + bookingId);
        return from_1.from(booking_model_1.default.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(bookingId) } },
            { $lookup: { from: 'Hotels', localField: 'hotelId', foreignField: '_id', as: 'hotelDocs' } },
            {
                $project: {
                    userId: '$userId',
                    bookingDate: '$bookingDate',
                    checkinDate: '$checkinDate',
                    checkinTime: '$checkinTime',
                    checkoutDate: '$checkoutDate',
                    checkoutTime: '$checkoutTime',
                    paymentDoneTimestamp: '$paymentDoneTimestamp',
                    bookingCancelledTimestamp: '$bookingCancelledTimestamp',
                    guestName: '$guestName',
                    mobileNumber: '$mobileNumber',
                    guestEmail: '$guestEmail',
                    status: '$status',
                    stayType: '$stayType',
                    roomId: '$roomId',
                    hotelId: '$hotelId',
                    roomToGuestMapping: '$roomToGuestMapping',
                    payment: '$payment',
                    hotelName: { '$arrayElemAt': ['$hotelDocs.name', 0] },
                    hotelAddress: { '$arrayElemAt': ['$hotelDocs.address', 0] },
                    isAllowingUnmarriedCouples: { '$arrayElemAt': ['$hotelDocs.isAllowingUnmarriedCouples', 0] },
                    briefDescription: { '$arrayElemAt': ['$hotelDocs.briefDescription', 0] },
                    hotelOwnerEmail: { '$arrayElemAt': ['$hotelDocs.hotelOwnerEmail', 0] },
                    hotelFrontImage: { '$arrayElemAt': ['$hotelDocs.hotelFrontImage', 0] }
                }
            }
        ]).exec());
    }
};
BookingRepositoryImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], BookingRepositoryImpl);
exports.BookingRepositoryImpl = BookingRepositoryImpl;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(6);
exports.PaymentSchema = new mongoose.Schema({
    paymentMode: { type: String },
    payStatus: { type: String },
    payAmount: { type: Number },
    displayRate: { type: Number },
    actualRate: { type: Number },
    discount: { type: Number },
    couponName: { type: String },
    couponDiscount: { type: Number },
    razorpayPaymentId: { type: String }
});
exports.RoomToGuestMappingSchema = new mongoose.Schema({
    roomNo: { type: String },
    guestType: { type: String },
    hourType: { type: String },
    roomType: { type: String }
});
exports.BookingSchema = new mongoose.Schema({
    userId: { type: String },
    bookingDate: { type: Date },
    checkinDate: { type: String },
    checkinTime: { type: String },
    checkoutDate: { type: String },
    checkoutTime: { type: String },
    paymentDoneTimestamp: { type: String },
    bookingCancelledTimestamp: { type: String },
    guestName: { type: String },
    mobileNumber: { type: Number },
    guestEmail: { type: String },
    roomToGuestMapping: [exports.RoomToGuestMappingSchema],
    status: { type: String },
    stayType: { type: String },
    roomId: { type: String },
    hotelId: { type: String },
    payment: exports.PaymentSchema,
    hotelFrontImage: { type: String },
    hotelOwnerEmail: { type: String },
    hotelName: { type: String },
    hotelAddress: { type: String },
    briefDescription: { type: String }
});
const Booking = mongoose.model('Booking', exports.BookingSchema, 'Booking');
exports.default = Booking;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(24);
var isPromise_1 = __webpack_require__(41);
var isArrayLike_1 = __webpack_require__(42);
var isInteropObservable_1 = __webpack_require__(43);
var isIterable_1 = __webpack_require__(44);
var fromArray_1 = __webpack_require__(46);
var fromPromise_1 = __webpack_require__(48);
var fromIterable_1 = __webpack_require__(50);
var fromObservable_1 = __webpack_require__(52);
var subscribeTo_1 = __webpack_require__(54);
function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof Observable_1.Observable) {
            return input;
        }
        return new Observable_1.Observable(subscribeTo_1.subscribeTo(input));
    }
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return fromObservable_1.fromObservable(input, scheduler);
        }
        else if (isPromise_1.isPromise(input)) {
            return fromPromise_1.fromPromise(input, scheduler);
        }
        else if (isArrayLike_1.isArrayLike(input)) {
            return fromArray_1.fromArray(input, scheduler);
        }
        else if (isIterable_1.isIterable(input) || typeof input === 'string') {
            return fromIterable_1.fromIterable(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}
exports.from = from;
//# sourceMappingURL=from.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var toSubscriber_1 = __webpack_require__(25);
var observable_1 = __webpack_require__(38);
var pipe_1 = __webpack_require__(39);
var config_1 = __webpack_require__(29);
var Observable = (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink._addParentTeardownLogic(this.source || (config_1.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config_1.config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(26);
var rxSubscriber_1 = __webpack_require__(37);
var Observer_1 = __webpack_require__(28);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __webpack_require__(27);
var Observer_1 = __webpack_require__(28);
var Subscription_1 = __webpack_require__(31);
var rxSubscriber_1 = __webpack_require__(37);
var config_1 = __webpack_require__(29);
var hostReportError_1 = __webpack_require__(30);
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        _this._parentSubscription = null;
        switch (arguments.length) {
            case 0:
                _this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (isTrustedSubscriber(destinationOrNext)) {
                        var trustedSubscriber = destinationOrNext[rxSubscriber_1.rxSubscriber]();
                        _this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                        _this.destination = trustedSubscriber;
                        trustedSubscriber._addParentTeardownLogic(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._addParentTeardownLogic = function (parentTeardownLogic) {
        if (parentTeardownLogic !== this) {
            this._parentSubscription = this.add(parentTeardownLogic);
        }
    };
    Subscriber.prototype._unsubscribeParentSubscription = function () {
        if (this._parentSubscription !== null) {
            this._parentSubscription.unsubscribe();
        }
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        this._parentSubscription = null;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config_1.config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError_1.hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError_1.hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError_1.hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError_1.hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
function isTrustedSubscriber(obj) {
    return obj instanceof Subscriber || ('syncErrorThrowable' in obj && obj[rxSubscriber_1.rxSubscriber]);
}
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(29);
var hostReportError_1 = __webpack_require__(30);
exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError_1.hostReportError(err);
        }
    },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _enable_super_gross_mode_that_will_cause_bad_things = false;
exports.config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = new Error();
            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};
//# sourceMappingURL=config.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function hostReportError(err) {
    setTimeout(function () { throw err; });
}
exports.hostReportError = hostReportError;
//# sourceMappingURL=hostReportError.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = __webpack_require__(32);
var isObject_1 = __webpack_require__(33);
var isFunction_1 = __webpack_require__(27);
var tryCatch_1 = __webpack_require__(34);
var errorObject_1 = __webpack_require__(35);
var UnsubscriptionError_1 = __webpack_require__(36);
var Subscription = (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
            _parent.remove(this);
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function') {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            this._parent = parent;
        }
        else if (!_parents) {
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errorObject_1 = __webpack_require__(35);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ?
        errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
exports.UnsubscriptionError = UnsubscriptionErrorImpl;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? Symbol.for('rxSubscriber')
    : '@@rxSubscriber';
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
//# sourceMappingURL=observable.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var noop_1 = __webpack_require__(40);
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = __webpack_require__(38);
function isInteropObservable(input) {
    return input && typeof input[observable_1.observable] === 'function';
}
exports.isInteropObservable = isInteropObservable;
//# sourceMappingURL=isInteropObservable.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = __webpack_require__(45);
function isIterable(input) {
    return input && typeof input[iterator_1.iterator] === 'function';
}
exports.isIterable = isIterable;
//# sourceMappingURL=isIterable.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
exports.getSymbolIterator = getSymbolIterator;
exports.iterator = getSymbolIterator();
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(24);
var Subscription_1 = __webpack_require__(31);
var subscribeToArray_1 = __webpack_require__(47);
function fromArray(input, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToArray_1.subscribeToArray(input));
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            var sub = new Subscription_1.Subscription();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }
}
exports.fromArray = fromArray;
//# sourceMappingURL=fromArray.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToArray = function (array) { return function (subscriber) {
    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
        subscriber.next(array[i]);
    }
    if (!subscriber.closed) {
        subscriber.complete();
    }
}; };
//# sourceMappingURL=subscribeToArray.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(24);
var Subscription_1 = __webpack_require__(31);
var subscribeToPromise_1 = __webpack_require__(49);
function fromPromise(input, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToPromise_1.subscribeToPromise(input));
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            var sub = new Subscription_1.Subscription();
            sub.add(scheduler.schedule(function () { return input.then(function (value) {
                sub.add(scheduler.schedule(function () {
                    subscriber.next(value);
                    sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                }));
            }, function (err) {
                sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
            }); }));
            return sub;
        });
    }
}
exports.fromPromise = fromPromise;
//# sourceMappingURL=fromPromise.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hostReportError_1 = __webpack_require__(30);
exports.subscribeToPromise = function (promise) { return function (subscriber) {
    promise.then(function (value) {
        if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }, function (err) { return subscriber.error(err); })
        .then(null, hostReportError_1.hostReportError);
    return subscriber;
}; };
//# sourceMappingURL=subscribeToPromise.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(24);
var Subscription_1 = __webpack_require__(31);
var iterator_1 = __webpack_require__(45);
var subscribeToIterable_1 = __webpack_require__(51);
function fromIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToIterable_1.subscribeToIterable(input));
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            var sub = new Subscription_1.Subscription();
            var iterator;
            sub.add(function () {
                if (iterator && typeof iterator.return === 'function') {
                    iterator.return();
                }
            });
            sub.add(scheduler.schedule(function () {
                iterator = input[iterator_1.iterator]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    var value;
                    var done;
                    try {
                        var result = iterator.next();
                        value = result.value;
                        done = result.done;
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }
}
exports.fromIterable = fromIterable;
//# sourceMappingURL=fromIterable.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var iterator_1 = __webpack_require__(45);
exports.subscribeToIterable = function (iterable) { return function (subscriber) {
    var iterator = iterable[iterator_1.iterator]();
    do {
        var item = iterator.next();
        if (item.done) {
            subscriber.complete();
            break;
        }
        subscriber.next(item.value);
        if (subscriber.closed) {
            break;
        }
    } while (true);
    if (typeof iterator.return === 'function') {
        subscriber.add(function () {
            if (iterator.return) {
                iterator.return();
            }
        });
    }
    return subscriber;
}; };
//# sourceMappingURL=subscribeToIterable.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(24);
var Subscription_1 = __webpack_require__(31);
var observable_1 = __webpack_require__(38);
var subscribeToObservable_1 = __webpack_require__(53);
function fromObservable(input, scheduler) {
    if (!scheduler) {
        return new Observable_1.Observable(subscribeToObservable_1.subscribeToObservable(input));
    }
    else {
        return new Observable_1.Observable(function (subscriber) {
            var sub = new Subscription_1.Subscription();
            sub.add(scheduler.schedule(function () {
                var observable = input[observable_1.observable]();
                sub.add(observable.subscribe({
                    next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                    error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                    complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
                }));
            }));
            return sub;
        });
    }
}
exports.fromObservable = fromObservable;
//# sourceMappingURL=fromObservable.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = __webpack_require__(38);
exports.subscribeToObservable = function (obj) { return function (subscriber) {
    var obs = obj[observable_1.observable]();
    if (typeof obs.subscribe !== 'function') {
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    }
    else {
        return obs.subscribe(subscriber);
    }
}; };
//# sourceMappingURL=subscribeToObservable.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(24);
var subscribeToArray_1 = __webpack_require__(47);
var subscribeToPromise_1 = __webpack_require__(49);
var subscribeToIterable_1 = __webpack_require__(51);
var subscribeToObservable_1 = __webpack_require__(53);
var isArrayLike_1 = __webpack_require__(42);
var isPromise_1 = __webpack_require__(41);
var isObject_1 = __webpack_require__(33);
var iterator_1 = __webpack_require__(45);
var observable_1 = __webpack_require__(38);
exports.subscribeTo = function (result) {
    if (result instanceof Observable_1.Observable) {
        return function (subscriber) {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            }
            else {
                return result.subscribe(subscriber);
            }
        };
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        return subscribeToObservable_1.subscribeToObservable(result);
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        return subscribeToArray_1.subscribeToArray(result);
    }
    else if (isPromise_1.isPromise(result)) {
        return subscribeToPromise_1.subscribeToPromise(result);
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        return subscribeToIterable_1.subscribeToIterable(result);
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
//# sourceMappingURL=subscribeTo.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __webpack_require__(17);
const winston_1 = __webpack_require__(7);
const moment = __webpack_require__(20);
__webpack_require__(11);
const inversify_1 = __webpack_require__(13);
const types_1 = __webpack_require__(10);
const constants_1 = __webpack_require__(18);
let SmsServiceImpl = class SmsServiceImpl {
    confimationNightstayHotelBooking(bookingId) {
        winston_1.default.info(`inside confimationNightstayHotelBooking`);
        return this.initSmsProcess(bookingId, constants_1.CONSTANTS.NIGHTSTAY_BOOKING_CONFIRMATION_SMS);
    }
    confimationMinistayHotelBooking(bookingId) {
        winston_1.default.info(`inside confimationMinistayHotelBooking`);
        return this.initSmsProcess(bookingId, constants_1.CONSTANTS.MINISTAY_BOOKING_CONFIRMATION_SMS);
    }
    paymentCompletionForHotelBooking(bookingId) {
        winston_1.default.info(`inside paymentCompletionForHotelBooking`);
        return this.initSmsProcess(bookingId, constants_1.CONSTANTS.PAYMENT_CONFIRMATION_SMS);
    }
    confimationRegularstayHotelBooking(bookingId) {
        winston_1.default.info(`inside confimationRegularstayHotelBooking`);
        return this.initSmsProcess(bookingId, constants_1.CONSTANTS.REGULARSTAY_BOOKING_CONFIRMATION_SMS);
    }
    cancellationOfHotelBooking(bookingId) {
        winston_1.default.info(`inside cancellationOfHotelBooking`);
        return this.initSmsProcess(bookingId, constants_1.CONSTANTS.BOOKING_CANCELLATION_SMS);
    }
    sendSms(smsType, bookingModel) {
        let msgBody = this.getSmsBodyBySmsType(smsType, bookingModel);
        return this.httpUtil.callRedSmsApiToSendmsg(msgBody, bookingModel.mobileNumber);
    }
    initSmsProcess(bookingId, smsType) {
        winston_1.default.info('inside initSmsProcess');
        return rxjs_1.Observable.create((observer) => {
            this.bookingRepositoryDb.getBookingDataForEmail(bookingId).subscribe((data) => {
                winston_1.default.debug(JSON.stringify(data));
                let bookingModel = data[0];
                this.sendSms(smsType, bookingModel).subscribe((result) => {
                    observer.next('Message send successfully');
                }, (error) => {
                    observer.error(error);
                });
            }, (error) => {
                winston_1.default.error(`error is ${error}`);
                observer.error('error while sending sms');
            });
        });
    }
    getSmsBodyBySmsType(smsType, bookingModel) {
        switch (smsType) {
            case constants_1.CONSTANTS.MINISTAY_BOOKING_CONFIRMATION_SMS:
                return this.getMinistayBookingMsg(bookingModel);
            case constants_1.CONSTANTS.NIGHTSTAY_BOOKING_CONFIRMATION_SMS:
                return this.getNightstayBookingMsg(bookingModel);
            case constants_1.CONSTANTS.PAYMENT_CONFIRMATION_SMS:
                return this.getPaymentCompletedMsg(bookingModel);
            case constants_1.CONSTANTS.BOOKING_CANCELLATION_SMS:
                return this.getBookingCancelledMsg(bookingModel);
            default:
                return this.getRegularstayBookingMsg(bookingModel);
        }
    }
    getMinistayBookingMsg(bookingModel) {
        let msgBody = `
        Hi ${bookingModel.guestName}, 
        your booking for Bag2Bag Ministay is confirmd.
        booking id: ${bookingModel._id}
        Checkin Date: ${moment(bookingModel.checkinDate).format("MMMM Do YYYY")}
        Time Slot: ${moment(bookingModel.checkinTime).format('h:mm a')} - ${moment(bookingModel.checkoutTime).format('h:mm a')}
        Place name: ${bookingModel.hotelName}
        Address: ${bookingModel.hotelAddress}
        For any help call our customer support at 7760829942.
        `;
        winston_1.default.debug('msgBody of ministay booking is: ', msgBody);
        return msgBody;
    }
    getRegularstayBookingMsg(bookingModel) {
        let msgBody = `
        Hi ${bookingModel.guestName},
        your booking for Bag2Bag Hotel Stay is confirmd.
        booking id: ${bookingModel._id}
        Checkin Date: ${moment(bookingModel.checkinDate).format("MMMM Do YYYY")}
        Checkout Date:  ${moment(bookingModel.checkoutDate).format("MMMM Do YYYY")}
        Place name: ${bookingModel.hotelName}
        Address: ${bookingModel.hotelAddress}
        For any help call our customer support at 7760829942.
        `;
        return msgBody;
    }
    getNightstayBookingMsg(bookingModel) {
        let msgBody = `
        Hi ${bookingModel.guestName},
        your booking for Bag2Bag Night Stay is confirmd.
        booking id: ${bookingModel._id}
        Checkin Date: ${moment(bookingModel.checkinDate).format("MMMM Do YYYY")}
        Checkin Time: ${moment(bookingModel.checkinTime).format('h:mm a')}
        Checkout Date:  ${moment(bookingModel.checkoutDate).format("MMMM Do YYYY")}
        Checkout Time: ${moment(bookingModel.checkoutTime).format('h:mm a')}
        Place name: ${bookingModel.hotelName}
        Address: ${bookingModel.hotelAddress}
        For any help call our customer support at 7760829942.
        `;
        return msgBody;
    }
    getPaymentCompletedMsg(bookingModel) {
        let msgBody = `
        Dear ${bookingModel.guestName}, 
        We have recieved your payment of Rs. ${bookingModel.payment.payAmount}.
        We thank you for the chance to serve you and look forward.
        Team Bag2Bag.
	    `;
        return msgBody;
    }
    getBookingCancelledMsg(bookingModel) {
        let msgBody = `
        Dear ${bookingModel.guestName}, 
        Sorry! Your Bag2Bag booking ${bookingModel._id}, 
        has been cancelled. Please try booking later we would be happy to serve you again in future.
        For any help call our customer support at 7760829942.
        `;
        return msgBody;
    }
};
__decorate([
    inversify_1.inject(types_1.default.BookingRepository),
    __metadata("design:type", Object)
], SmsServiceImpl.prototype, "bookingRepositoryDb", void 0);
__decorate([
    inversify_1.inject(types_1.default.HttpUtil),
    __metadata("design:type", Object)
], SmsServiceImpl.prototype, "httpUtil", void 0);
SmsServiceImpl = __decorate([
    inversify_1.injectable()
], SmsServiceImpl);
exports.SmsServiceImpl = SmsServiceImpl;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __webpack_require__(17);
__webpack_require__(11);
const config = __webpack_require__(3);
const inversify_1 = __webpack_require__(13);
const winston_1 = __webpack_require__(7);
const https_1 = __webpack_require__(57);
const http_1 = __webpack_require__(58);
const querystring_1 = __webpack_require__(19);
const MAIL_CONFIG = config.get('appConfig.mailConfig');
const SMS_CONFIG = config.get('appConfig.smsConfig');
let HttpUtilImpl = class HttpUtilImpl {
    constructor() {
        winston_1.default.info('Email Services called');
    }
    callElasticMailApiToSendMail(postData) {
        winston_1.default.info('inside callElasticMailApiToSendMail');
        let postOptions = this.createHeaderOptionForElasticEmailAPI(postData);
        return this.makeHttpsPostRequest(postOptions, postData);
    }
    callRedSmsApiToSendmsg(msg, mNumber) {
        winston_1.default.info('inside callRedSmsApiToSendmsg');
        let options = this.createHeaderOptionForRedSMSAPI(msg, mNumber);
        return this.makeHttpsGetRequest(options);
    }
    createHeaderOptionForRedSMSAPI(msg, mNumber) {
        winston_1.default.info('Inside createHeaderOptionForRedSMSAPI');
        let queryString = querystring_1.stringify({
            user: SMS_CONFIG.username,
            password: SMS_CONFIG.password,
            type: SMS_CONFIG.sms_type,
            senderid: SMS_CONFIG.sms_sender_id,
            phone: mNumber + ',7760829942',
            text: msg
        });
        let encodedUsernameAndPassword = Buffer.from(SMS_CONFIG.username + ':' + SMS_CONFIG.password).toString('base64');
        let options = {
            host: SMS_CONFIG.sms_host,
            path: SMS_CONFIG.sms_path + queryString,
            headers: {
                'Authorization': 'Basic ' + encodedUsernameAndPassword
            },
            method: 'GET',
        };
        return options;
    }
    createHeaderOptionForElasticEmailAPI(post_data) {
        winston_1.default.info('inside createHeaderOptionForElasticEmailAPI');
        const post_options = {
            host: MAIL_CONFIG.host,
            path: MAIL_CONFIG.path,
            method: MAIL_CONFIG.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };
        return post_options;
    }
    makeHttpsPostRequest(post_options, postData) {
        winston_1.default.info('inside makeHttpsPostRequest');
        return rxjs_1.Observable.create((observer) => {
            try {
                winston_1.default.debug('Inside try block');
                const postRequest = https_1.request(post_options, function (res) {
                    winston_1.default.debug('Inside rquest block');
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        let result = JSON.parse(chunk);
                        winston_1.default.debug(`chunk is ${chunk}`);
                        if (result.success == true) {
                            observer.next('HTT request send successfully');
                        }
                        else {
                            observer.error(`Failed to send http request and msg is ${result.error}`);
                        }
                    });
                    res.on('error', function (e) {
                        winston_1.default.info(`Error: ${e.message}`);
                        winston_1.default.error(`Error: ${e.message}`);
                        observer.error(`Failed to send http request and msg is ${e.message}`);
                    });
                });
                postRequest.write(postData);
                postRequest.end();
            }
            catch (e) {
                winston_1.default.error(`Error: ${e.message}`);
                observer.error(`Failed to send http request and msg is ${e.message}`);
            }
        });
    }
    makeHttpsGetRequest(options) {
        winston_1.default.info('inside makeHttpsGetRequest and options is ' + JSON.stringify(options));
        return rxjs_1.Observable.create((observer) => {
            try {
                winston_1.default.debug('Inside try block');
                const postRequest = http_1.request(options, (res) => {
                    winston_1.default.debug('Inside rquest block');
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        winston_1.default.debug('Inside on data block');
                        winston_1.default.debug(`chunk is ${chunk}`);
                        if (chunk == 'Provide all required details') {
                            observer.error(`Failed to send http request and msg is ${chunk}`);
                            return;
                        }
                        if (chunk == 'Sent') {
                            observer.next('HTTP request send successfully');
                            return;
                        }
                        let result = JSON.parse(chunk);
                        if (result.success == true) {
                            observer.next('HTTP request send successfully');
                        }
                        else {
                            observer.error(`Failed to send http request and msg is ${result.error}`);
                        }
                    });
                    res.on('error', (e) => {
                        winston_1.default.error(`Error: ${e}`);
                        winston_1.default.error(`Error: ${e.message}`);
                        observer.error(`Failed to send http request and msg is ${e.message}`);
                    });
                    res.on("end", () => {
                        winston_1.default.info('Request End');
                    });
                });
                postRequest.end();
            }
            catch (e) {
                winston_1.default.error(`Error: ${e.message}`);
                observer.error(`Failed to send http request and msg is ${e.message}`);
            }
        });
    }
};
HttpUtilImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], HttpUtilImpl);
exports.HttpUtilImpl = HttpUtilImpl;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(13);
const types_1 = __webpack_require__(10);
__webpack_require__(11);
const winston_1 = __webpack_require__(7);
const route_constants_1 = __webpack_require__(15);
let SMSController = class SMSController {
    constructor(smsService) {
        this.smsService = smsService;
    }
    register(app) {
        winston_1.default.info('Inside registered !');
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_SMS_ROUTE}/send/booking/sms/of/nightstay/booking/:bookingId`, this.confimationNightstayHotelBooking.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_SMS_ROUTE}/send/booking/sms/of/ministay/booking/:bookingId`, this.confimationMinistayHotelBooking.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_SMS_ROUTE}/send/booking/sms/of/payment/confirmation/:bookingId`, this.paymentCompletionForHotelBooking.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_SMS_ROUTE}/send/booking/sms/of/regularstay/booking/:bookingId`, this.confimationRegularstayHotelBooking.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_SMS_ROUTE}/send/booking/sms/of/booking/cancellation/:bookingId`, this.cancellationOfHotelBooking.bind(this));
    }
    confimationNightstayHotelBooking(req, res, next) {
        winston_1.default.info('Inside confimationNightstayHotelBooking !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.smsService.confimationNightstayHotelBooking(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    confimationMinistayHotelBooking(req, res, next) {
        winston_1.default.info('Inside confimationMinistayHotelBooking !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.smsService.confimationMinistayHotelBooking(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    paymentCompletionForHotelBooking(req, res, next) {
        winston_1.default.info('Inside paymentCompletionForHotelBooking !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.smsService.paymentCompletionForHotelBooking(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    confimationRegularstayHotelBooking(req, res, next) {
        winston_1.default.info('Inside confimationRegularstayHotelBooking !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.smsService.confimationRegularstayHotelBooking(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    cancellationOfHotelBooking(req, res, next) {
        winston_1.default.info('Inside cancelationOfHotelBooking !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.smsService.cancellationOfHotelBooking(bookingId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
};
SMSController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.SmsService)),
    __metadata("design:paramtypes", [Object])
], SMSController);
exports.SMSController = SMSController;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(11);
const types_1 = __webpack_require__(10);
const inversify_1 = __webpack_require__(13);
const rxjs_1 = __webpack_require__(17);
const config = __webpack_require__(3);
const querystring_1 = __webpack_require__(19);
const winston_1 = __webpack_require__(7);
const MAIL_CONFIG = config.get('appConfig.mailConfig');
let WelcomeServiceImp = class WelcomeServiceImp {
    sendWelcomeElasticEmailForNewCustomer(userId) {
        return rxjs_1.Observable.create((observer) => {
            this.userRepositoryDb.getUserDataForEmailAndSms(userId).subscribe((userModel) => {
                winston_1.default.debug(JSON.stringify(userModel));
                this.initBookingEmailProcess(userModel).subscribe((data) => {
                    observer.next('welcome Mail sent successfully');
                }, (error) => {
                    observer.error(error);
                });
            });
        });
    }
    sendWelcomeSmsForNewCustomer(userId) {
        return rxjs_1.Observable.create((observer) => {
            this.userRepositoryDb.getUserDataForEmailAndSms(userId).subscribe((userModel) => {
                winston_1.default.debug(JSON.stringify(userModel));
                let mNumber = userModel.mobileNo;
                winston_1.default.debug('mNumber is ' + mNumber);
                if (mNumber == null || mNumber == undefined) {
                    this.initSmsProcess(userModel).subscribe((data) => {
                        observer.next('Message send successfully');
                    }, (error) => {
                        observer.error(error);
                    });
                }
                else {
                    observer.error('Mobile number does not exist.');
                }
            });
        });
    }
    sendWelcomeSmsAndEmailForNewCustomer(userId) {
        return rxjs_1.Observable.create((observer) => {
            this.userRepositoryDb.getUserDataForEmailAndSms(userId).subscribe((userModel) => {
                winston_1.default.debug(JSON.stringify(userModel));
                this.initBookingEmailProcess(userModel).subscribe((data) => {
                    let mNumber = userModel.mobileNo;
                    winston_1.default.debug('mNumber is ' + mNumber);
                    if (mNumber != null && mNumber != undefined) {
                        this.initSmsProcess(userModel).subscribe((data) => {
                            observer.next('Sms and Mail send successfully');
                        }, (error) => {
                            observer.error('Mail send but sms failed.');
                        });
                    }
                    else {
                        observer.next('Mail send but mobile number does not exist.');
                    }
                }, (error) => {
                    observer.error(error);
                });
            });
        });
    }
    initBookingEmailProcess(userModel) {
        winston_1.default.info('inside initBookingEmailProcess');
        let postData = this.createWelcomeQueryStringForCustomer(userModel);
        return this.httpUtil.callElasticMailApiToSendMail(postData);
    }
    initSmsProcess(userModel) {
        winston_1.default.info('inside initSmsProcess');
        let msgBody = this.newUserWelcomeMsg(userModel);
        return this.httpUtil.callRedSmsApiToSendmsg(msgBody, userModel.mobileNo);
    }
    newUserWelcomeMsg(userModel) {
        let msgBody = `
        Hi, ${userModel.firstName} ${userModel.lastName}! Welcome to Bag2Bag. We are thrilled you have found us!
        Please let us know if you have any questions www.bag2bag.in
        `;
        return msgBody;
    }
    createWelcomeQueryStringForCustomer(userModel) {
        const postData = querystring_1.stringify({
            username: MAIL_CONFIG.username,
            api_key: MAIL_CONFIG.api_key,
            trackClicks: true,
            template: MAIL_CONFIG.welcome_template,
            isTransactional: true,
            from: MAIL_CONFIG.from,
            from_name: MAIL_CONFIG.from_name,
            subject: MAIL_CONFIG.welcome_subject,
            msgTo: userModel.emailId,
            msgCC: MAIL_CONFIG.from
        });
        winston_1.default.debug(`welcome url is :${postData}`);
        return postData;
    }
};
__decorate([
    inversify_1.inject(types_1.default.UserRepository),
    __metadata("design:type", Object)
], WelcomeServiceImp.prototype, "userRepositoryDb", void 0);
__decorate([
    inversify_1.inject(types_1.default.HttpUtil),
    __metadata("design:type", Object)
], WelcomeServiceImp.prototype, "httpUtil", void 0);
WelcomeServiceImp = __decorate([
    inversify_1.injectable()
], WelcomeServiceImp);
exports.WelcomeServiceImp = WelcomeServiceImp;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __webpack_require__(17);
const inversify_1 = __webpack_require__(13);
__webpack_require__(11);
const user_model_1 = __webpack_require__(62);
const winston_1 = __webpack_require__(7);
let UserRepositoryImpl = class UserRepositoryImpl {
    constructor() {
        winston_1.default.info('User Repository');
    }
    getUserDataForEmailAndSms(userId) {
        winston_1.default.debug('user id is: ' + userId);
        return this.getUserById(userId);
    }
    getUserById(userId) {
        return rxjs_1.from(user_model_1.default.findById(userId).exec());
    }
};
UserRepositoryImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], UserRepositoryImpl);
exports.UserRepositoryImpl = UserRepositoryImpl;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(6);
exports.UserSchema = new mongoose.Schema({
    uid: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String },
    address: { type: String },
    gender: { type: String },
    type: { type: String },
    photoUrl: { type: String },
    roles: { type: [String] },
    mobileNo: { type: Number },
    age: { type: Number },
    emailVerified: { type: Boolean }
});
const User = mongoose.model('User', exports.UserSchema, 'User');
exports.default = User;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(13);
__webpack_require__(11);
const types_1 = __webpack_require__(10);
const winston_1 = __webpack_require__(7);
const route_constants_1 = __webpack_require__(15);
let WelcomeController = class WelcomeController {
    constructor(welcomeService) {
        this.welcomeService = welcomeService;
    }
    register(app) {
        winston_1.default.info('Inside registered !');
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_SMS_ROUTE}/send/welcome/sms/to/customer/by/:userId`, this.welcomeSmsForNewCustomer.bind(this));
        app.post(`${route_constants_1.ROUTE_CONSTANTS.REST_EMAIL_ROUTE}/send/welcome/email/to/customer/by/:userId`, this.welcomeElasticEmailForNewCustomer.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}/send/welcome/email/and/sms/to/customer/by/:userId`, this.sendWelcomeSmsAndEmailForNewCustomer.bind(this));
    }
    welcomeElasticEmailForNewCustomer(req, res, next) {
        winston_1.default.info('Inside welcomeElasticEmailForNewCustomer !');
        let userId = req.params.userId;
        this.welcomeService.sendWelcomeElasticEmailForNewCustomer(userId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    welcomeSmsForNewCustomer(req, res, next) {
        winston_1.default.info('Inside welcomeSmsForNewCustomer !');
        let userId = req.params.userId;
        this.welcomeService.sendWelcomeSmsForNewCustomer(userId).subscribe((result) => {
            res.send({ data: result });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    sendWelcomeSmsAndEmailForNewCustomer(req, res, next) {
        winston_1.default.info('Inside welcomeSmsForNewCustomer !');
        let userId = req.params.userId;
        this.welcomeService.sendWelcomeSmsAndEmailForNewCustomer(userId).subscribe((result) => {
            winston_1.default.debug('welcome sms and email result is ' + result);
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
        res.send({ data: 'Email and SMS is under process.' });
    }
};
WelcomeController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.WelcomeService)),
    __metadata("design:paramtypes", [Object])
], WelcomeController);
exports.WelcomeController = WelcomeController;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(13);
const winston_1 = __webpack_require__(7);
const types_1 = __webpack_require__(10);
const route_constants_1 = __webpack_require__(15);
const constants_1 = __webpack_require__(18);
let EmailAndSmsController = class EmailAndSmsController {
    constructor(smsService, emailService, bookingRepository) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.bookingRepository = bookingRepository;
    }
    register(app) {
        winston_1.default.info('Inside registered !');
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}/send/booking/sms/and/mail/mini/stay/to/customer/by/:bookingId`, this.sendMinistayBookingConfirmedHttpRequest.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}/send/booking/sms/and/mail/night/stay/to/customer/by/:bookingId`, this.sendNightstayBookingConfirmedHttpRequest.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}/send/booking/sms/and/mail/regular/stay/to/customer/by/:bookingId`, this.sendRegularStayBookingConfirmedHttpRequest.bind(this));
    }
    sendMinistayBookingConfirmedHttpRequest(req, res, next) {
        winston_1.default.info('Inside sendMinistayBookingConfirmedHttpRequest !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.bookingRepository.getBookingDataForEmail(bookingId).subscribe((data) => {
            winston_1.default.debug(JSON.stringify(data));
            let bookingModel = data[0];
            if (!bookingModel) {
                winston_1.default.debug(`Booking id is not available in the db ${bookingId}`);
                res.status(500).send({ message: `Booking id is not available in the db ${bookingId}` });
                return;
            }
            this.emailService.sendMail(constants_1.CONSTANTS.TO_ALL, bookingModel).subscribe((result) => {
                winston_1.default.debug('Mail is send successfully');
                this.smsService.sendSms(constants_1.CONSTANTS.MINISTAY_BOOKING_CONFIRMATION_SMS, bookingModel).subscribe((result1) => {
                    winston_1.default.debug('sms is send successfully');
                    res.send({ data: 'Mail and sms send successfully' });
                }, (error) => {
                    winston_1.default.error(error);
                    res.status(500).send({ message: 'Error while sending sms' });
                });
            }, (error) => {
                winston_1.default.error(error);
                res.status(500).send({ message: 'Error while sendig mail' });
            });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    sendNightstayBookingConfirmedHttpRequest(req, res, next) {
        winston_1.default.info('Inside sendNightstayBookingConfirmedHttpRequest !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.bookingRepository.getBookingDataForEmail(bookingId).subscribe((data) => {
            winston_1.default.debug(JSON.stringify(data));
            let bookingModel = data[0];
            if (!bookingModel) {
                winston_1.default.debug(`Booking id is not available in the db ${bookingId}`);
                res.status(500).send({ message: `Booking id is not available in the db ${bookingId}` });
                return;
            }
            this.emailService.sendMail(constants_1.CONSTANTS.TO_ALL, bookingModel).subscribe((result) => {
                winston_1.default.debug('Mail is send successfully');
                this.smsService.sendSms(constants_1.CONSTANTS.NIGHTSTAY_BOOKING_CONFIRMATION_SMS, bookingModel).subscribe((result) => {
                    winston_1.default.debug('sms is send successfully');
                    res.send({ data: 'Mail and sms send successfully' });
                }, (error) => {
                    winston_1.default.error(error);
                    res.status(500).send({ message: 'Error while sending sms' });
                });
            }, (error) => {
                winston_1.default.error(error);
                res.status(500).send({ message: 'Error while sendig mail' });
            });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
    sendRegularStayBookingConfirmedHttpRequest(req, res, next) {
        winston_1.default.info('Inside sendRegularStayBookingConfirmedHttpRequest !');
        let bookingId = req.params.bookingId;
        winston_1.default.debug('bookingId ' + bookingId);
        this.bookingRepository.getBookingDataForEmail(bookingId).subscribe((data) => {
            winston_1.default.debug(JSON.stringify(data));
            let bookingModel = data[0];
            if (!bookingModel) {
                winston_1.default.debug(`Booking id is not available in the db ${bookingId}`);
                res.status(500).send({ message: `Booking id is not available in the db ${bookingId}` });
                return;
            }
            this.emailService.sendMail(constants_1.CONSTANTS.TO_ALL, bookingModel).subscribe((result) => {
                winston_1.default.debug('Mail is send successfully');
                this.smsService.sendSms(constants_1.CONSTANTS.REGULARSTAY_BOOKING_CONFIRMATION_SMS, bookingModel).subscribe((result) => {
                    winston_1.default.debug('sms is send successfully');
                    res.send({ data: 'Mail and sms send successfully' });
                }, (error) => {
                    winston_1.default.error(error);
                    res.status(500).send({ message: 'Error while sending sms' });
                });
            }, (error) => {
                winston_1.default.error(error);
                res.status(500).send({ message: 'Error while sendig mail' });
            });
        }, (error) => {
            winston_1.default.error(error);
            res.status(500).send({ message: error });
        });
    }
};
EmailAndSmsController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.SmsService)),
    __param(1, inversify_1.inject(types_1.default.EmailService)),
    __param(2, inversify_1.inject(types_1.default.BookingRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EmailAndSmsController);
exports.EmailAndSmsController = EmailAndSmsController;


/***/ })
/******/ ]);