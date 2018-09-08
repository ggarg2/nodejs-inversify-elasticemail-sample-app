import { Observable } from 'rxjs';
import 'reflect-metadata';
/* http service implementation interface for sending the Elastic Mails And Red Sms to the customer */
export interface HttpUtil {
    /* http sending the Elastic Mails to the customer with post data */
    callElasticMailApiToSendMail(postData: any): Observable<string>;
    /* http sending the Red Sms to the customer with post data */
    callRedSmsApiToSendMsg(msg: string, mNumber: number): Observable<string>;
}