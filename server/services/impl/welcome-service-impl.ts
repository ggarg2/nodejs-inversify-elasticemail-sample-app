import { WelcomeService } from "../welcome.service";
import 'reflect-metadata';
import TYPES from "../../configuration/types";
import { HttpUtil } from "../http.util";
import { Observable, Observer } from "rxjs";
import * as config from 'config';
import { stringify } from "querystring";
import LOGGER from "../../configuration/winston";
import { UserModel } from "../../models/user.model";
import { UserRepository } from "../../repositories/user.repository";
import { injectable, inject } from "inversify";

const MAIL_CONFIG: any = config.get('appConfig.mailConfig');

@injectable()
/* welcome implementation service for sending the Elastic Mail and Red Sms to the customer with post data and userModel Database */
export class WelcomeServiceImp implements WelcomeService {

	@inject(TYPES.UserRepository)
	private userRepositoryDb: UserRepository;

	@inject(TYPES.HttpUtil)
	private httpUtil: HttpUtil;

	public sendWelcomeElasticEmailToNewCustomer(userId: string): Observable<string> {
		return Observable.create(
			(observer: Observer<string>) => {
				this.userRepositoryDb.getUserDataForEmailAndSms(userId).subscribe(
					(userModel: UserModel) => {
						LOGGER.debug(JSON.stringify(userModel));
						this.initElasticEmailProcess(userModel).subscribe(
							(data: string) => {
								observer.next('welcome Mail sent successfully');
							},
							(error: any) => {
								observer.error(error);
							}
						)
					});
			});
	}

	public sendWelcomeRedSmsToNewCustomer(userId: string): Observable<string> {
		return Observable.create(
			(observer: Observer<string>) => {
				this.userRepositoryDb.getUserDataForEmailAndSms(userId).subscribe(
					(userModel: UserModel) => {
						LOGGER.debug(JSON.stringify(userModel));
						this.initRedSmsProcess(userModel).subscribe(
							(data: string) => {
								observer.next('welcome Sms sent successfully');
							},
							(error: any) => {
								observer.error(error);
							}
						)
					});
			});
	}





	private initRedSmsProcess(
		userModel: UserModel,
	): Observable<string> {
		LOGGER.info('inside init Elastic Email Process');
		let msgBody: string = this.newUserWelcomeMsg(
			userModel
		);
		return this.httpUtil.callRedSmsApiToSendMsg(msgBody, userModel.mobileNo);
	}

	private initElasticEmailProcess(
		userModel: UserModel,
	): Observable<string> {
		LOGGER.info('inside init Elastic EmailProcess')
		let postData: any = this.createWelcomeElasticEmailQueryStringForCustomer(
			userModel
		)
		return this.httpUtil.callElasticMailApiToSendMail(postData);
	}






	private createWelcomeElasticEmailQueryStringForCustomer(userModel: UserModel): any {
		const postData = stringify({
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
		})
		LOGGER.debug(`welcome Elastic Email url is :${postData}`);
		return postData;
	}


	private newUserWelcomeMsg(userModel: UserModel): string {
		LOGGER.info('inside init Red Sms Welcome Message Process');
		let msgBody = `
        Hi, ${userModel.firstName} ${userModel.lastName}! Welcome to Bag2Bag. We are thrilled you have found us!
        Please let us know if you have any questions www.bag2bag.in
        `;
		return msgBody;
	}



}