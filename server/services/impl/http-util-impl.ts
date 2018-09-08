import { Observable, Observer, of } from 'rxjs';
import 'reflect-metadata';
import * as config from 'config';
import LOGGER from '../../configuration/winston';
import { request as httpsRequest } from 'https';
import { request as httpRequest, RequestOptions } from 'http';
import { HttpUtil } from '../http.util';
import { stringify } from 'querystring';
import { injectable } from 'inversify';

const MAIL_CONFIG: any = config.get('appConfig.mailConfig');
const SMS_CONFIG: any = config.get('appConfig.smsConfig');

@injectable()
/* http service implementation for sending the Elastic Mails to the customer */
export class HttpUtilImpl implements HttpUtil {

	constructor() {
		LOGGER.info('Email Services called');
	}
	/* Public function for sending the Elastic Mails to the customer */
	public callElasticMailApiToSendMail(postData: any): Observable<string> {
		LOGGER.info('inside call Elastic Mail Api To Send Mail');
		let postOptions: RequestOptions = this.createHeaderOptionForElasticEmailAPI(postData);
		return this.makeHttpsPostRequest(postOptions, postData);
	}

	/* Public function for sending the Red Sms to the customer */
	public callRedSmsApiToSendMsg(msg: string, mNumber: number): Observable<string> {
		LOGGER.info('inside call Red Sms Api To Send Msg');
		let options: RequestOptions = this.createHeaderOptionForRedSMSAPI(msg, mNumber);
		return this.makeHttpsGetRequest(options);
	}

	/* Private function for sending the Red Sms Data For customer */
	private createHeaderOptionForRedSMSAPI(msg: string, mNumber: number): RequestOptions {
		LOGGER.info('Inside createHeaderOptionForRedSMSAPI')
		let queryString = stringify({

			user: SMS_CONFIG.username,
			password: SMS_CONFIG.password,
			type: SMS_CONFIG.sms_type,
			senderid: SMS_CONFIG.sms_sender_id,
			/*change 123456 phone: mNumber + ', <Additional number like Care,Sender Etc>' */
			phone: mNumber + ', 123456',
			/* Msg body assign the text */
			text: msg
		})
		/* Msg encoding the sender username and password detail */
		let encodedUsernameAndPassword: string = Buffer.from(SMS_CONFIG.username + ':' + SMS_CONFIG.password).toString('base64');
		/* Addtional Msg information like host and Url path */
		let options: RequestOptions = {
			host: SMS_CONFIG.sms_host,
			path: SMS_CONFIG.sms_path + queryString,
			headers: {
				'Authorization': 'Basic ' + encodedUsernameAndPassword
			},
			/* Msg http methord type like Get Post */
			method: 'GET',
		};
		return options;
	}
	/* Private methord for other Header options  */
	private createHeaderOptionForElasticEmailAPI(post_data: any): RequestOptions {
		LOGGER.info('inside create Header Option For Elastic EmailAPI');
		const post_options: RequestOptions = {
			/* Addtional Mail information like host and Url path */
			host: MAIL_CONFIG.host,
			path: MAIL_CONFIG.path,
			/* Mail http methord type like Get Post */
			method: MAIL_CONFIG.method,
			/* Mail header content and authorization type */
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(post_data)
			}
		}
		return post_options;
	}
	/* Msg http methord type like Get Post */
	private makeHttpsPostRequest(post_options: RequestOptions, postData: any): Observable<string> {
		LOGGER.info('inside make Https Post Request');
		return Observable.create(
			(observer: Observer<string>) => {
				try {
					LOGGER.debug('Inside try block');
					const postRequest = httpsRequest(post_options, function (res: any) {
						LOGGER.debug('Inside rquest block');
						res.setEncoding('utf8');
						res.on('data', function (chunk: any) {
							let result = JSON.parse(chunk);
							LOGGER.debug(`chunk is ${chunk}`);
							if (result.success == true) {
								observer.next('HTT request send successfully');
							} else {
								observer.error(`Failed to send http request and error message is ${result.error}`);
							}
						});
						res.on('error', function (e: Error) {
							LOGGER.info(`Error: ${e.message}`)
							LOGGER.error(`Error: ${e.message}`);
							observer.error(`Failed to send http request and error message is ${e.message}`);
						});
					});
					postRequest.write(postData);
					postRequest.end();
				} catch (e) {
					LOGGER.error(`Error: ${e.message}`);
					observer.error(`Failed to send http request and error message is ${e.message}`);
				}
			})
	}

	private makeHttpsGetRequest(options: RequestOptions): Observable<string> {
		LOGGER.info('inside make Https Get Request and options is ' + JSON.stringify(options));
		return Observable.create(
			(observer: Observer<string>) => {
				try {
					LOGGER.debug('Inside try block');

					const postRequest = httpRequest(options, (res: any) => {
						LOGGER.debug('Inside rquest block');
						res.setEncoding('utf8');
						res.on('data', (chunk: any) => {
							LOGGER.debug('Inside on data block');
							LOGGER.debug(`chunk is ${chunk}`);
							if (chunk == 'Provide all required details') {
								observer.error(`Failed to send http request and error message is ${chunk}`);
								return;
							}
							if (chunk == 'Sent') {
								observer.next('HTTP request send successfully');
								return;
							}
							let result = JSON.parse(chunk);
							if (result.success == true) {
								observer.next('HTTP request send successfully');
							} else {
								observer.error(`Failed to send http request and error message is ${result.error}`);
							}
						});
						res.on('error', (e: Error) => {
							LOGGER.error(`Error: ${e}`);
							LOGGER.error(`Error: ${e.message}`);
							observer.error(`Failed to send http request and error message is ${e.message}`);
						});

						res.on("end", () => {
							LOGGER.info('Request End')
						})
					});
					postRequest.end();
				} catch (e) {
					LOGGER.error(`Error: ${e.message}`);
					observer.error(`Failed to send http request and  error message is ${e.message}`);
				}
			})
	}
}